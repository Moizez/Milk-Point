import React, { useState, Fragment } from 'react'
import FAB from 'react-native-paper/lib/module/components/FAB/FABGroup'
import { Modal } from 'react-native'

import DateModal from '../Modals/DateModal'

const Fab = ({
    setShowDatePicker, filterByQuantityLiters, filterByLast15Days,
    filterByLast30Days, filterByTwoDates, openWarning, iconColor
}) => {

    const [state, setState] = useState({ open: false })
    const onStateChange = ({ open }) => setState({ open })
    const { open } = state

    const [dateModal, setDateModal] = useState(false)

    const openCalendar = () => setShowDatePicker(true)
    const closeDateModal = () => setDateModal(false)
    const openDateModal = () => setDateModal(true)

    return (
        <Fragment>
            <FAB
                open={open}
                icon={open ? 'close' : 'magnify'}
                color='#FFF'
                fabStyle={{ backgroundColor: iconColor }}
                actions={[
                    {
                        icon: 'calendar',
                        label: 'Data específica',
                        onPress: () => {
                            openCalendar()
                        },
                    },
                    {
                        icon: 'calendar-search',
                        label: 'Busca avançada',
                        onPress: () => openDateModal(),
                    },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                    if (open) {
                    }
                }}
            />

            <Modal
                transparent={true}
                visible={dateModal}
                animationType='slide'
            >
                <DateModal
                    closeModal={closeDateModal}
                    filterByQuantityLiters={filterByQuantityLiters}
                    filterByLast15Days={filterByLast15Days}
                    filterByLast30Days={filterByLast30Days}
                    filterByTwoDates={filterByTwoDates}
                    openWarning={openWarning}
                />
            </Modal>
        </Fragment>
    );
}

export default Fab
