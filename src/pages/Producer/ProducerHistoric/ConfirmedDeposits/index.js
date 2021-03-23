import React, { useState, useEffect } from 'react'
import { RefreshControl, Platform, Modal } from 'react-native'
import styled from 'styled-components/native'
import moment from 'moment'

import Api from '../../../../services/producer.api'
import HistoricCard from '../../../../components/Cards/HistoricCard'
import Loader from '../../../../components/Loader'
import WarningModal from '../../../../components/Modals/WarningModal'
import { Fab } from '../../../../components/Fab'
import DatePicker from '../../../../components/DatePicker'
import EmptyListCard from '../../../../components/Cards/EmptyListCard'

import {
    filterSpecificDay, filterByDateInterval, filterByBetweenDates
} from '../../../../components/Helpers'

const ConfirmedDeposits = () => {

    const type = true
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [datePicker, setDatePicker] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date())

    const [dataResolved, setDataResolved] = useState([])
    const [mainData, setMainData] = useState([])

    useEffect(() => {
        const loadPage = async () => {
            setLoading(true)
            const response = await Api.getAllDepositsConfirmedOrCanceledUser('confirmados')
            const result = await filterSpecificDay(selectedDate, response)
            setMainData(result)
            setLoading(false)
        }
        loadPage()
    }, [selectedDate])

    useEffect(() => {
        const getDepositsResolvedByUser = async () => {
            setLoading(true)
            const response = await Api.getAllDepositsConfirmedOrCanceledUser('confirmados')
            setDataResolved(response)
            setLoading(false)
        }
        getDepositsResolvedByUser()
    }, [])

    const filterByQuantityLiters = (value) => {
        setLoading(true)
        const result = dataResolved.filter(i => i.quantidade == value)
        setMainData(result)
        setLoading(false)
    }

    const filterByLast15Days = () => {
        setLoading(true)
        const result = filterByDateInterval(15, 'days', dataResolved)
        setMainData(result)
        setLoading(false)
    }

    const filterByLast30Days = () => {
        setLoading(true)
        const result = filterByDateInterval(1, 'month', dataResolved)
        setMainData(result)
        setLoading(false)
    }

    const filterByTwoDates = (initialDate, finalDate) => {
        setLoading(true)
        const date = finalDate ? finalDate : moment()
        const result = filterByBetweenDates(dataResolved, initialDate, date)
        setMainData(result)
        setLoading(false)
    }

    const onChange = (currentDate) => {
        setDatePicker(Platform.OS === 'ios')
        let date = currentDate ? currentDate : moment()
        setSelectedDate(date)
    }

    const onRefreshList = () => {
        setIsRefreshing(true)
        setSelectedDate(moment())
        setIsRefreshing(false)
    }

    const openWarningModal = (message) => {
        setTypeMessage(message)
        setWarningModal(true)
    }

    const closeWarningModal = () => setWarningModal(false)

    return (
        <Container>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={mainData}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                renderItem={({ item }) => <HistoricCard data={item} />}
                ListEmptyComponent={
                    <EmptyListCard
                        iconLeft={'gesture-swipe-down'}
                        iconRight={'calendar-search'}
                        infoLeft={'Clique e arraste para atualizar a lista.'}
                        infoRight={'Clique no ícone do calendário para filtrar a lista.'}
                    />
                }
            />
            {loading && <Loader />}

            {datePicker &&
                <DatePicker
                    chosenDate={selectedDate}
                    onSet={onChange}
                />
            }

            <Fab
                setShowDatePicker={setDatePicker}
                filterByQuantityLiters={filterByQuantityLiters}
                filterByLast15Days={filterByLast15Days}
                filterByLast30Days={filterByLast30Days}
                filterByTwoDates={filterByTwoDates}
                isLoading={setLoading}
                openWarning={openWarningModal}
                type={type}
            />

            <Modal
                animationType='fade'
                transparent={true}
                visible={warningModal}
            >
                <WarningModal
                    closeModal={closeWarningModal}
                    message={typeMessage}
                    lottie={require('../../../../assets/lottie/error-icon.json')}
                    bgColor={false}
                />
            </Modal>

        </Container>
    );
}

export default ConfirmedDeposits

const Container = styled.View`
    flex: 1;
    background-color: #292b2c;
`;
const FlatList = styled.FlatList`
    flex: 1;
    background-color: #FFF;
`;