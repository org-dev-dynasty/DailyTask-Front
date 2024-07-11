import React, { useState, SetStateAction, useEffect } from 'react';
import { Modal, Image, View, Keyboard } from 'react-native';
import { Background } from "@/components/background";
import { UserImage, Container, NameUser, EmailUser, ButtonChangeEmail, ButtonText, ButtonChangePassword, ButtonDeleteAccount, ModalContainer, ModalContent, TitleModal, Subtitle, ButtonModal, ButtonTextModal, ButtonOut, ButtonModalDelete, ViewButtons, Logout } from "./styles";
import theme from "@/themes/theme";
import { ThemeProvider } from 'styled-components/native';
import { Input } from '@/components/input/input';
import { LinearGradient } from 'expo-linear-gradient';
import { ModalConfigs } from '@/components/modalConfigs';


export default function Configs() {
    const [isEmailModalVisible, setEmailModalVisible] = useState(false);
    const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
    const [isDeleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [senhaAtual, setsenhaAtual] = useState('');
    const [erroSenhaAtual, setErroSenhaAtual] = useState('');
    const [senhaNova, setsenhaNova] = useState('');
    const [erroSenhaNova, setErroSenhaNova] = useState('');

    const handleEmailChange = (newEmail: string) => {
        setEmail(newEmail);
    }

    useEffect(() => {
        if (email !== '') {
            setErroEmail('');
        }
        if (senhaAtual !== '') {
            setErroSenhaAtual('');
        }
        if (senhaNova !== '') {
            setErroSenhaNova('');
        }
    }, [email, senhaAtual, senhaNova]); 

    return (
        <ThemeProvider theme={theme}>
            <Background>
                <Logout href='/login'>
                    <Image source={require('../../../assets/appImages/logout.png')} />
                </Logout>
                <Container>
                    <UserImage
                        source={require('../../../assets/appImages/user.png')}
                    />
                    <NameUser>José da Silva Pereira</NameUser>
                    <EmailUser>{email}</EmailUser>
                    <ButtonChangeEmail onPress={() => setEmailModalVisible(true)}>
                        <ButtonText>Alterar E-mail</ButtonText>
                    </ButtonChangeEmail>
                    <ButtonChangePassword onPress={() => setPasswordModalVisible(true)}>
                        <ButtonText>Alterar Senha</ButtonText>
                    </ButtonChangePassword>
                    <ButtonDeleteAccount onPress={() => setDeleteAccountModalVisible(true)}>
                        <ButtonText>Deletar Conta</ButtonText>
                    </ButtonDeleteAccount>
                    <ModalConfigs type='email' modalVisible={isEmailModalVisible} closeModal={() => setEmailModalVisible(false)} onEmailChange={handleEmailChange}></ModalConfigs>
                    <ModalConfigs type='senha' modalVisible={isPasswordModalVisible} closeModal={() => setPasswordModalVisible(false)} onEmailChange={handleEmailChange}></ModalConfigs>
                    <ModalConfigs type='' modalVisible={isDeleteAccountModalVisible} closeModal={() => setDeleteAccountModalVisible(false)} onEmailChange={handleEmailChange}></ModalConfigs>
                </Container>
            </Background>
        </ThemeProvider>    
    );
}




/* 
   4- arrumar o botão deletar do modal de deletar conta, levar para tela de login
   5- fazer o display de dark mode e light mode*/
