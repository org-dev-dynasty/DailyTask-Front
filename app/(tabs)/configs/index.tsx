import React, { useState, SetStateAction, useEffect } from 'react';
import { Background } from "@/components/background";
import { UserImage, Container, NameUser, EmailUser, ButtonChangeEmail, ButtonText, ButtonChangePassword, ButtonDeleteAccount, Logout, ViewSwitch } from "./styles";
import theme from "@/themes/theme";
import { ThemeProvider } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ModalConfigs } from '@/components/modalConfigs';
import { SignOut, User } from 'phosphor-react-native';
import CustomToggleSwitch from '@/components/switch';

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
                    <SignOut color='#ffffff' size={48}/>
                </Logout>
                <Container>
                    <UserImage>
                        <User color='#ffffff' size={64} />
                    </UserImage>
                    <NameUser>José da Silva Pereira</NameUser>
                    <EmailUser>silvajose@gmail.com</EmailUser>
                    <ViewSwitch>
                       <CustomToggleSwitch/>
                    </ViewSwitch>
                    <ButtonChangeEmail onPress={() => setEmailModalVisible(true)}>
                        <ButtonText>Alterar E-mail</ButtonText>
                    </ButtonChangeEmail>
                    <ButtonChangePassword onPress={() => setPasswordModalVisible(true)}>
                        <ButtonText>Alterar Senha</ButtonText>
                    </ButtonChangePassword>
                    <ButtonDeleteAccount onPress={() => setDeleteAccountModalVisible(true)}>
                        <ButtonText>Deletar Conta</ButtonText>
                    </ButtonDeleteAccount>
                    <ModalConfigs type='email' modalVisible={isEmailModalVisible} closeModal={() => setEmailModalVisible(false)}></ModalConfigs>
                    <ModalConfigs type='senha' modalVisible={isPasswordModalVisible} closeModal={() => setPasswordModalVisible(false)}></ModalConfigs>
                    <ModalConfigs type='' modalVisible={isDeleteAccountModalVisible} closeModal={() => setDeleteAccountModalVisible(false)}></ModalConfigs>
                </Container>
            </Background>
        </ThemeProvider>    
    );
}