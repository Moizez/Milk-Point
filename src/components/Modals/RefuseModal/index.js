import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    Container, CloseContainer, ModalBox, CloseButton, ModalHeader, Title, ModalInfo,
    NoButton, YesButton, TextButton} from './styles'

const RefuseModal = ({ closeModal, confirmModal, title }) => {
    return (
        <Container>
            <CloseContainer onPress={closeModal} activeOpacity={1} />
            <ModalBox>
                <ModalHeader>
                    <CloseButton onPress={closeModal}>
                        <Icon name='chevron-down' color='#FFF' size={40} />
                    </CloseButton>
                    <Title>{title}</Title>
                </ModalHeader>
                <ModalInfo>

                    <NoButton onPress={closeModal}>
                        <TextButton>Não</TextButton>
                    </NoButton>

                    <YesButton onPress={confirmModal}>
                        <TextButton>Sim</TextButton>
                    </YesButton>

                </ModalInfo>
            </ModalBox>
        </Container>
    );
}

export default RefuseModal


