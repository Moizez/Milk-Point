import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { PermissionsAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import 'moment/locale/pt-br'

import {
    Container, TechnicalBox, LocalizationBox, Title, BoldText, Text,
    ButtonBox, HowToGetButton, ButtonText, DividerH
} from './styles'

const Specifications = ({ data }) => {

    const navigation = useNavigation()
    const [hasLocationPermission, setHasLocationPermission] = useState(false)

    let capacidade = data.qtdAtual + data.qtdRestante
    let tipo = data.tipo == 'BOVINO' ? 'Bovino' : 'Caprino'
    let criacao = moment(data.dataCriacao).locale('pt-br').format('L')

    const verifyLocationPermission = async () => {
        setTimeout(async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setHasLocationPermission(true)
                } else {
                    setHasLocationPermission(false)
                }
            } catch (err) {
                console.warn(err)
            }
        }, 1000);
    }

    useEffect(() => {
        verifyLocationPermission()
    }, [hasLocationPermission])

    return (
        <Container>

            <TechnicalBox>

                <Title>Informações Técnicas</Title>

                <DividerH />

                <BoldText>Capacidade: <Text>{capacidade} litros</Text></BoldText>
                <BoldText>Volume atual: <Text>{data.qtdAtual} litros</Text></BoldText>
                <BoldText>Cabem: <Text>{data.qtdRestante} litros</Text></BoldText>
                <BoldText>Tipo do leite: <Text>{tipo}</Text></BoldText>
                <BoldText>Data da instalação: <Text>{criacao}</Text></BoldText>
                <BoldText>Atual responsável: <Text>{data.responsavel.nome}</Text></BoldText>
                {data.status ? <BoldText>Situação: <Text>Ativo</Text></BoldText> :
                    <BoldText>Situação: <Text>Inativo</Text></BoldText>
                }
                {!data.status && <BoldText>Motivo: <Text>{data.observacao}</Text></BoldText>}

            </TechnicalBox>

            <LocalizationBox>

                <Title>Localização</Title>

                <DividerH />

                <BoldText>Estado: <Text>{data.uf}</Text></BoldText>
                <BoldText>Cidade: <Text>{data.localidade}</Text></BoldText>
                <BoldText>CEP: <Text>{data.cep}</Text></BoldText>
                <BoldText>Bairro/Comunidade: <Text>{data.bairro}</Text></BoldText>
                <BoldText>Rua: <Text>{data.logradouro}</Text></BoldText>
                {data.complemento != '' && <BoldText>Complemento: <Text>{data.complemento}</Text></BoldText>}

            </LocalizationBox>

            <ButtonBox>
                <HowToGetButton onPress={() => navigation.navigate('RouteMap', {
                    data: data,
                    permission: hasLocationPermission
                })}>
                    <ButtonText>Como chegar?</ButtonText>
                    <Icon name='google-maps' size={30} color='#FFF' />
                </HowToGetButton>
            </ButtonBox>

        </Container>
    );
}

export default Specifications