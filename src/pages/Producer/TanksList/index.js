import React, { useState, useContext, useEffect } from 'react'
import { Modal, Keyboard, View, Text, StyleSheet } from 'react-native'

import Api from '../../../services/producer.api'

import DepositModal from '../../../components/Modals/DepositModal'
import ConfirmationModal from '../../../components/Modals/ConfirmationModal'
import WarningModal from '../../../components/Modals/WarningModal'

import GraficoTanque from '../../../components/GraficoTanque'
import AlertErrorSuccess from '../../../components/AlertErrorSuccess'
import AlertInformation from '../../../components/AlertInformation'
import { AuthContext } from '../../../contexts/auth'

const TanksList = ({ data, loadTanks }) => {

    // const { loadPendingDepositsProducer } = useContext(AuthContext)
    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')

    const [depositModal, setDepositModal] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [lottie, setLottie] = useState('')

    const [qtdInfo, setQtdInfo] = useState()

    const openDepositModal = () => setDepositModal(true)
    const closeDepositModal = () => setDepositModal(false)
    const openConfirmationModal = () => setConfirmationModal(true)
    const closeConfirmationModal = () => setConfirmationModal(false)
    const openWarningModal = () => setWarningModal(true)
    const closeWarningModal = () => setWarningModal(false)

    useEffect(() => {
        loadTanks()
    }, [])

    //Solicitação de depósito pelo produtor
    const requestDeposito = async (quantidade, idTanque) => {
        await Api.setDeposit(quantidade, idTanque)
    };

    const handleDeposito = async (value) => {
        setQtdInfo(value)

        if (data.status) {
            if (isNaN(value) || value <= 0) {
                setLottie(error)
                setTypeMessage('Valor inválido, digite a quantidade novamente!')
                openWarningModal()
            } else if (value > data.qtdRestante) {
                setLottie(error)
                setTypeMessage('O valor excede o limite do tanque!')
                openWarningModal()
            } else {
                setLottie(success)
                openConfirmationModal()
            }
        } else {
            setLottie(error)
            setTypeMessage('Este tanque está inativo!')
            openWarningModal()
        }
        Keyboard.dismiss()
    }

    const handleConfirm = async () => {
        await requestDeposito(qtdInfo, data.id)
        closeConfirmationModal()
        closeDepositModal()
        setTypeMessage('Depósito realizado com sucesso!')
        openWarningModal()
    }

    return (
        <View style={styles.container}>

            <View style={styles.cardContainer} activeOpacity={0.7}>
                <View style={styles.infoCard}>
                    <Text style={styles.textInfo}>Tanque: <Text style={styles.text}>{data.nome}</Text></Text>
                    <Text style={styles.textInfo}>Tipo do leite: <Text style={styles.text}>{data.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</Text></Text>
                    <Text style={styles.textInfo}>Vol. atual: <Text style={styles.text}>{data.qtdAtual} litros</Text></Text>
                    <Text style={styles.textInfo}>Cabem: <Text style={styles.text}>{data.qtdRestante} litros</Text></Text>
                    <Text style={styles.textInfo}>Responsável: <Text style={styles.text}>{data.responsavel.nome}</Text></Text>
                    {!data.status && <Text style={{ ...styles.textInfo, color: '#da1e37' }}>Inativo: <Text style={styles.text}>{data.observacao}</Text></Text>}
                </View>

                <View style={{ width: 0.5, height: '100%', backgroundColor: '#adb5bd' }}></View>

                <GraficoTanque dataGrafico={data} handleOpenModal={openDepositModal} activeTanque={data.status ? false : true} />
            </View>

            <Modal
                transparent={true}
                visible={depositModal}
                animationType='slide'
            >
                <DepositModal
                    confirmModal={handleDeposito}
                    closeModal={closeDepositModal}
                />
            </Modal>

            <Modal
                animationType='slide'
                transparent={true}
                visible={confirmationModal}
            >
                <ConfirmationModal
                    closeModal={closeConfirmationModal}
                    confirmModal={handleConfirm}
                    data={data}
                    quantidade={qtdInfo}
                />
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={warningModal}
            >
                <WarningModal
                    closeModal={closeWarningModal}
                    message={typeMessage}
                    lottie={lottie}
                    bgColor={false}
                />
            </Modal>

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf9f9',
        margin: 8,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 5
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    infoCard: {
        flex: 1.5,
        backgroundColor: '#faf9f9',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 6,

    },
    textInfo: {
        fontWeight: 'bold',
        fontSize: 14.5,
    },
    text: {
        fontWeight: 'normal',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#2a9d8f',
        borderWidth: 2,
        borderColor: '#FFF'
    },
})

export default TanksList