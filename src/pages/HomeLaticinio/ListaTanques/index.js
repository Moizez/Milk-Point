import React, { useState, useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Modal, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import GraficoTanque from '../../../components/GraficoTanque'
import ModalDetalheTanque from '../../../components/ModalDetalheTanque'
import ModalDepositoRetirada from '../../../components/ModalDepositoRetirada'

import { AuthContext } from '../../../contexts/auth'

import {
    BoxGeral, Container, Nome, NomeValor, BoxTanque, BoxFabBtn, FabBtn, FabText
} from './styles'

export default function ListaTanques({ data }) {

    const navigation = useNavigation()

    const { user } = useContext(AuthContext)

    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisibleDois, setModalVisibleDois] = useState(false)

    const [idLat, setIdLat] = useState(user.id)
    const [idTanque, setIdTanque] = useState(data.id)

    //Solicitação de retirada pelo laticinio
    const requestRetirada = async (quantidade, idLat, idTanque) => {
        const data = new FormData();
        data.append("quantidade", quantidade);
        data.append("idLat", idLat);
        data.append("idTanque", idTanque);

        await fetch('https://milkpoint.herokuapp.com/api/retirada', { method: 'POST', body: data })

    };

    async function handleRetirada(value) {
        if (isNaN(value) || value <= 0) {
            alert('Valor inválido, digite a quantidade novamente!')
        } else if (value > data.qtdAtual) {
            alert("Sua retirada excede o valor máximo atual do tanque!")
            return
        } else {
            alert("Retirada realizada com sucesso!" + "\n" + "Aguarde a confirmação!")
            setIdLat(user.id)
            setIdTanque(data.id)
            await requestRetirada(value, idLat, idTanque)
            setModalVisibleDois(!modalVisibleDois)
            setModalVisible(!modalVisible)
        }
        Keyboard.dismiss()
    }

    function handleCloseModal() {
        return setModalVisible(false)
    }

    function handleCloseModalDois() {
        return setModalVisibleDois(false)
    }

    function goToDetalhes() {
        navigation.navigate('Detalhes Tanque')
    }

    return (
        <BoxGeral>
            <Container onPress={() => { setModalVisible(!modalVisible) }}>
                <BoxTanque>
                    <Nome>Tanque: <NomeValor>{data.nome}</NomeValor></Nome>
                    <Nome>Tipo do Leite: <NomeValor>{data.tipo === 'BOVINO' ? 'Bovino' : 'Caprino'}</NomeValor></Nome>
                    <Nome>Vol. Atual: <NomeValor>{data.qtdAtual} litros</NomeValor></Nome>
                    <Nome>Ainda cabe: <NomeValor>{data.qtdRestante} litros</NomeValor></Nome>
                    <Nome>Responsável: <NomeValor>{data.responsavel.nome}</NomeValor></Nome>
                </BoxTanque>

                <GraficoTanque dataGrafico={data} />
            </Container>

            <Modal
                animationType='slide'
                transparent={false}
                visible={modalVisible}
            >
                <ModalDetalheTanque
                    dataTanque={data}
                    onClose={handleCloseModal}
                />

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisibleDois}
                >

                    <ModalDepositoRetirada
                        onConfirme={handleRetirada}
                        onClose={handleCloseModalDois}
                    />

                </Modal>

                <BoxFabBtn>
                    <FabBtn onPress={() => { setModalVisibleDois(!modalVisibleDois) }}>
                        <Icon
                            name='arrow-up-bold-hexagon-outline'
                            color='#FFF'
                            size={20}>
                        </Icon>
                        <FabText>Retirar</FabText>
                    </FabBtn>
                </BoxFabBtn>

            </Modal>
        </BoxGeral >
    );
}