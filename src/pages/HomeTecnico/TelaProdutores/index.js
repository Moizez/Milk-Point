import React, { useState, useEffect, useContext } from 'react'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../../../contexts/auth'

import Header from '../../../components/Header'
import ListaProdutores from '../ListaProdutores'
import {
  Container, BoxNomeAviso, NomeAviso, List, BoxIconAviso,
  BoxIconUpdate, BoxIconDelete
} from '../styles'

export default function TelaProdutores() {

  const { loadListProdutores, produtor } = useContext(AuthContext)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    loadListProdutores()
  }, [])

  async function onRefreshList() {
    setIsRefreshing(true)
    await loadListProdutores()
    setIsRefreshing(false)
  }

  return (
    <Container>
      <Header msg={'Lista de produtores'} />
      <List
        showsVerticalScrollIndicator={false}
        data={produtor}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
        renderItem={({ item }) => <ListaProdutores data={item} />}
        ListEmptyComponent={
          <BoxNomeAviso>
            <NomeAviso style={{ marginBottom: 70 }}>Não há registro de transações!</NomeAviso>
            <NomeAviso style={{ marginBottom: 15 }}>{<Icon name='lightbulb-on-outline' color='#adb5bd' size={25} />} Dicas</NomeAviso>
            <BoxIconAviso>
              <BoxIconUpdate>
                <Icon name='gesture-swipe-down' color='#adb5bd' size={60} />
                <NomeAviso>Clique e arraste para atualizar os tanques</NomeAviso>
              </BoxIconUpdate>
              <BoxIconDelete>
                <Icon name='gesture-tap' color='#adb5bd' size={60} />
                <NomeAviso>Clique no tanque para mais detalhes e opções</NomeAviso>
              </BoxIconDelete>
            </BoxIconAviso>
          </BoxNomeAviso>}
      />
    </Container>
  );
}