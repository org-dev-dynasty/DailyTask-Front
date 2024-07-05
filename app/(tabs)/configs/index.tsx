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

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleButtonPressEmail = () => {
        if (!validateEmail(email)) {
            setErroEmail('Por favor, insira um e-mail válido.');
        } else {
            setEmail('');
            Keyboard.dismiss();
            setEmailModalVisible(false);
        }
    }

    

    const handleButtonPressPassword = () => {
        if (senhaAtual === senhaNova) {
            setErroSenhaNova('Por favor, insira uma senha diferente.')
        } else if (senhaNova.length < 8) {
            setErroSenhaNova('A senha deve ter no mínimo 8 caracteres.');
        } else if (!/[A-Z]/.test(senhaNova)) {
            setErroSenhaNova('A senha deve ter pelo menos uma letra maiúscula.');
        } else if (!/[a-z]/.test(senhaNova)) {
            setErroSenhaNova('A senha deve ter pelo menos uma letra minúscula.');
        } else if (!/\d/.test(senhaNova)) {
            setErroSenhaNova('A senha deve ter pelo menos um número.');
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(senhaNova)) {
            setErroSenhaNova('A senha deve ter pelo menos um caractere especial.');
        } else {
            setsenhaAtual('');
            setsenhaNova('');
            Keyboard.dismiss();
            setPasswordModalVisible(false);
        }
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
                    <EmailUser>silvajose@gmail.com</EmailUser>
                    <ButtonChangeEmail onPress={() => setEmailModalVisible(true)}>
                        <ButtonText>Alterar E-mail</ButtonText>
                    </ButtonChangeEmail>
                    <ButtonChangePassword onPress={() => setPasswordModalVisible(true)}>
                        <ButtonText>Alterar Senha</ButtonText>
                    </ButtonChangePassword>
                    <ButtonDeleteAccount onPress={() => setDeleteAccountModalVisible(true)}>
                        <ButtonText>Deletar Conta</ButtonText>
                    </ButtonDeleteAccount>
                    <ModalConfigs type='email' modalVisible={isEmailModalVisible} ></ModalConfigs>
                    {/* <ModalConfigs type='senha' modalVisible={isPasswordModalVisible}></ModalConfigs>
                    <ModalConfigs type='' modalVisible={isDeleteAccountModalVisible}></ModalConfigs> */}
                </Container>
            </Background>
        </ThemeProvider>
    );
}




/* 
   2- arrumar o ButtonOut do modal do email
   3- quando o usuario alterar o email, o EmailUser mude tbm
   4- arrumar o botão deletar do modal de deletar conta, mostrando uma mensagem de conta deletada e levar para tela de login
   5- fazer o display de dark mode e light mode*/
