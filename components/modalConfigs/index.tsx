import { ModalProps } from "@/interfaces/modalConfigs";
import React, { SetStateAction, useCallback, useEffect, useState } from "react";
import { Image, Modal, View, Keyboard } from "react-native";
import { Title, ButtonOut, Subtitle, ButtonModal, ButtonTextModal, ModalContainer, ModalContent, ButtonDelete } from "./styles"
import { Background } from "../background";
import { Input } from "../input/input";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {XCircle} from "phosphor-react-native";

export const ModalConfigs = (props: ModalProps) => {
    const [email, setEmail] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [senhaAtual, setsenhaAtual] = useState('');
    const [erroSenhaAtual, setErroSenhaAtual] = useState('');
    const [senhaNova, setsenhaNova] = useState('');
    const [erroSenhaNova, setErroSenhaNova] = useState('');
    const [themeModeS, setThemeModeS] = useState('dark');

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleButtonPressDelete = () => {
        props.closeModal;
        router.replace('/login')
    }

    const handleButtonPressEmail = () => {
        if (!validateEmail(email)) {
            setErroEmail('Por favor, insira um e-mail válido.');
        } else {
            setEmail('');
            Keyboard.dismiss();
            props.closeModal(); 
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
            props.closeModal(); 
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

    useFocusEffect(
        useCallback(() => {
            AsyncStorage.getItem('themeMode').then((value) => {
                if (value) {
                    setThemeModeS(value);
                }
            });
        }
    , []));


    return(
        <Modal
            visible={props.modalVisible}
            transparent={true}
        >
            <ModalContainer>
                <ModalContent>
                    <LinearGradient
                        colors={themeModeS === 'dark' ? ['#3C0B50', '#2E083D', '#0F0413'] : ['#ffffff', '#ffffff', '#ffffff']}
                        locations={themeModeS === 'dark' ? [0, 0.28, 1] : [1, 1, 1]}
                        style={{
                            flex: 1,
                            width: "100%",
                            borderRadius: 15,
                            borderColor: themeModeS === 'dark' ? '#ffffff' : '#000000',
                            borderWidth: 2
                        }} 
                    >
                        <ButtonOut onPress={props.closeModal}>
                            <XCircle size={32} color='#F06B41' />
                        </ButtonOut>
                        <Title style={{color: themeModeS === 'dark' ? '#ffffff' : '#000000' }}>
                            {props.type == 'email' ? 
                                'Novo Email'
                            :
                            props.type == 'senha' ?
                                'Nova Senha'
                            :
                                'Deletar Conta'
                            }
                        </Title>
                        <Subtitle style={{color: themeModeS === 'dark' ? '#ffffff' : '#000000' }}>
                            {props.type == 'email' ?
                                'Insira um novo email para a sua conta'
                            :
                            props.type == 'senha' ?
                                'Crie uma nova senha para a sua conta'
                            :
                                'Deseja realmente deletar esta conta ?'
                            }
                        </Subtitle>
                        <View>
                            {props.type == 'email' ?
                            <>
                                <View style={{ width: '100%', paddingLeft: '8%', paddingRight: '8%' }}>
                                    <Input label="Digite o novo email..." value={email} onChangeText={(text: SetStateAction<string>) => setEmail(text)} error={erroEmail} />
                                </View>
                                <ButtonModal onPress={handleButtonPressEmail}>
                                    <ButtonTextModal>Confirmar</ButtonTextModal>
                                </ButtonModal>
                            </>    
                            :
                            props.type == 'senha' ?
                            <>
                                <View style={{ width: '100%', paddingLeft: '8%', paddingRight: '8%' }}>
                                    <Input label="Digite a senha atual..." value={senhaAtual} onChangeText={(text: SetStateAction<string>) => setsenhaAtual(text)} error={erroSenhaAtual}  />
                                    <Input label="Digite a nova senha..." value={senhaNova} onChangeText={(text: SetStateAction<string>) => setsenhaNova(text)} error={erroSenhaNova} />
                                </View>
                                <ButtonModal onPress={handleButtonPressPassword}>
                                    <ButtonTextModal>Confirmar</ButtonTextModal>
                                </ButtonModal>
                            </>
                            :
                            <>
                                <ButtonDelete onPress={handleButtonPressDelete}>
                                    <ButtonTextModal>Deletar</ButtonTextModal>
                                </ButtonDelete>
                            </>
                            }
                        </View>
                    </LinearGradient>
                </ModalContent>
            </ModalContainer>
        </Modal>
    )
}
