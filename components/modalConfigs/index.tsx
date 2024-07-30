import { ModalProps } from "@/interfaces/modalConfigs";
import { SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { Image, Modal, View, Keyboard } from "react-native";
import { Title, ButtonOut, Subtitle, ButtonModal, ButtonTextModal, ModalContainer, ModalContent, ButtonDelete } from "./styles"
import { Background } from "../background";
import { Input } from "../input/input";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "@/context/user_context";

export const ModalConfigs = (props: ModalProps) => {
    const [senhaAtual, setsenhaAtual] = useState('');
    const [erroSenhaAtual, setErroSenhaAtual] = useState('');
    const [senhaNova, setsenhaNova] = useState('');
    const [erroSenhaNova, setErroSenhaNova] = useState('');
    const [themeModeS, setThemeModeS] = useState('dark');
    const { changePassword } = useContext(UserContext);
    const { deleteAccount } = useContext(UserContext);

    const handleButtonPressDelete = async () => {
        const result = deleteAccount();
        if (await result) {
            props.closeModal();
            alert('Conta deletada com sucesso!');
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
        } else if (senhaAtual === '') {
            setErroSenhaAtual('Por favor, insira a senha atual.');
        } else {
            Keyboard.dismiss();
            changePassoword(); 
        }
    }

    async function changePassoword() {
        console.log('entrou');
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
            const result = changePassword(token, senhaNova, senhaAtual);
            if (await result) {
                props.closeModal();
                alert('Senha alterada com sucesso!');
                setsenhaAtual('');
                setsenhaNova('');
            }
        }
    }

    useEffect(() => {
        if (senhaAtual !== '') {
            setErroSenhaAtual('');
        }
        if (senhaNova !== '') {
            setErroSenhaNova('');
        }
    }, [senhaAtual, senhaNova]); 

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
                            <Image
                                source={require('../../assets/appImages/button-out.png')}
                            />
                        </ButtonOut>
                        <Title style={{color: themeModeS === 'dark' ? '#ffffff' : '#000000' }}>
                            {props.type == 'senha' ?
                                'Nova Senha'
                            :
                                'Deletar Conta'
                            }
                        </Title>
                        <Subtitle style={{color: themeModeS === 'dark' ? '#ffffff' : '#000000' }}>
                            {props.type == 'senha' ?
                                'Crie uma nova senha para a sua conta'
                            :
                                'Deseja realmente deletar esta conta ?'
                            }
                        </Subtitle>
                        <View>
                            {props.type == 'senha' ?
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
