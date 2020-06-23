import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth'

import MenuButton from '../../../components/MenuButton'
import Header from '../../../components/Header'
import ListaRetiradasPendentes from '../ListaRetiradasPendentes'

import { Container, BoxNomeAviso, NomeAviso, Box, Titulo, List } from './styles'

export default function TelaRetiradasPendentesResponsavel() {

    const { user } = useContext(AuthContext)
    const [retiradaPendente, setRetiradaPendente] = useState([])

    //Lista de Retiradas Pendentes
    useEffect(() => {
        const loadListRetiradasPendentes = async () => {
            const response = await fetch('https://milkpoint.herokuapp.com/api/retirada/listapendentes')
            const retiradaPendente = await response.json()
            setRetiradaPendente(retiradaPendente)
        }

        loadListRetiradasPendentes()

    }, [])

    return (
        <Container>
            <MenuButton />

            <Header/>

            <Box>
                <Titulo>Lista de retiradas pendentes</Titulo>
            </Box>

            <List
                showsVerticalScrollIndicator={false}
                data={retiradaPendente}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<ListaRetiradasPendentes data={item} />)}
                ListEmptyComponent={<BoxNomeAviso><NomeAviso>Não há retiradas pendentes!</NomeAviso></BoxNomeAviso>}
            />
        </Container>
    );
}