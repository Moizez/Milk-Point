import React, { useState, useEffect } from 'react';
import { } from 'react-native';

import MenuButton from '../../components/MenuButton'
import TanqueList from '../../components/TanqueList'

import { Container, BoxNome, Nome, Box, Titulo, List } from './styles'


export default function HomeProdutor() {

    const [tanque, setTanque] = useState([])

    useEffect(() => {
        async function loadList() {
            const response = await fetch('https://milkpoint.herokuapp.com/api/tanque')
            const data = await response.json()
            setTanque(data)
        }

        loadList()

    }, [])

    return (
        <Container>
            <MenuButton />

            <BoxNome>
                <Nome>Home do Produtor</Nome>
            </BoxNome>
            <Box>
                <Titulo>Lista de tanques</Titulo>
            </Box>

            <List
                showsVerticalScrollIndicator={false}
                data={tanque}
                keyExtractor={(item, key) => key.toString()}
                renderItem={({ item }) => (<TanqueList data={item} />)}
            />
        </Container>
    );
}