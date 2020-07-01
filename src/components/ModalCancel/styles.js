import styled from 'styled-components/native';

//MODAL

export const BoxModal = styled.View`
height: 50%;
width: 100%;
bottom: 0;
position: absolute;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
background-color: #292b2c;
justify-content: center;
align-items: center;
`;

export const BoxTitulo = styled.View`
flex-direction: row;
padding: 8px;
background-color: #292b2c;
`;

export const TituloInfo = styled.Text`
font-size: 17px;
font-weight: bold;
color: #FFF;
margin-top: 5px;
`;

export const BoxInfo = styled.View`
flex: 1;
flex-direction: row;
align-items: center ;
justify-content: center;
`;

export const NomeModal = styled.Text`
font-size: 17px;
`;

export const BoxInfoModal = styled.View`
flex: 1;
border-radius: 8px;
background-color: #ececec;
align-items: center ;
justify-content: center;
width: 90%;
`;

export const BtnCancel = styled.View`
align-items: center;
justify-content: center;
background-color: #da1e37;
width: 90%;
height: 60px;
border-radius: 8px;
margin-left: 8px;
margin-top: -30px;
`;

export const Btn = styled.Text`
font-size: 18px;
`;

export const BtnFechar = styled.TouchableOpacity`
background-color: #ececec;
border-radius: 8px;
margin-bottom: 10px;
width: 90%;
height: 45px;
align-items: center;
justify-content: center;
`;

export const BtnText = styled.Text`
font-size: 22px;
color: #000;

`;