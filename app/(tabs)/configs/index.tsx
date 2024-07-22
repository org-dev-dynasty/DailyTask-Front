import React, { useState, SetStateAction, useEffect, useCallback } from 'react';
import { Background } from "@/components/background";
import { UserImage, Container, NameUser, EmailUser, ButtonChangeEmail, ButtonText, ButtonChangePassword, ButtonDeleteAccount, Logout, ViewSwitch } from "./styles";
import theme from "@/themes/theme";
import { ThemeProvider } from 'styled-components/native';
import { ModalConfigs } from '@/components/modalConfigs';
import { SignOut, User } from 'phosphor-react-native';
import CustomToggleSwitch from '@/components/switch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';

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
    const [themeModeS, setThemeModeS] = useState('dark'); // dark or light theme const
    
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

    // UseEffect to get the theme mode from the AsyncStorage && to get token from the AsyncStorage
    useFocusEffect(
        useCallback(() => {
            console.log('Configs');
            AsyncStorage.getItem('themeMode').then((value) => {
                if (value) {
                    setThemeModeS(value);
                }
            });
        }
    , []));

    const handleNavigation = () => {
        router.replace('/login')
    }

    const handleThemeChange = (isDark: any) => {
        const newTheme = isDark ? 'dark' : 'light';
        setThemeModeS(newTheme);
        AsyncStorage.setItem('themeMode', newTheme);
    };
    return (
        <ThemeProvider theme={theme}>
            <Background themeMode={themeModeS}>
                <Logout onPress={handleNavigation}>
                    <SignOut color={themeModeS === 'dark' ? '#ffffff' : '#000000'} size={48}/>
                </Logout>
                <Container>
                    <UserImage>
                        <User color={themeModeS === 'dark' ? '#ffffff' : '#000000'} size={64} />
                    </UserImage>
                    <NameUser style={{color: themeModeS === 'dark' ? '#ffffff' : '#000000' }}>José da Silva Pereira</NameUser>
                    <EmailUser style={{color: themeModeS === 'dark' ? '#ffffff' : '#000000' }}>silvajose@gmail.com</EmailUser>
                    <ViewSwitch>
                        <CustomToggleSwitch themeMode={themeModeS} onValueChange={handleThemeChange}/>
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