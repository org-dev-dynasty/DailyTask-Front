import { ModalProps } from "@/interfaces/modalConfigs";
import { SetStateAction, useEffect, useState } from "react";
import { Image, Modal, View, Keyboard } from "react-native";
import { Title, ButtonOut, Subtitle, ButtonModal, ButtonTextModal, ModalContainer, ModalContent, ButtonDelete } from "./styles"
import { Background } from "../background";
import { Input } from "../input/input";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";




export const ModalConfigs = (props: ModalProps) => {
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

    function teste() {
        console.log('teste');
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

    return(
        <Modal
            visible={props.modalVisible}
            transparent={true}
        >
            <ModalContainer>
                <ModalContent>
                    <LinearGradient
                        colors={['#3C0B50', '#2E083D', '#0F0413']}
                        locations={[0, 0.28, 1]}
                        style={{
                            flex: 1,
                            width: "100%",
                            borderRadius: 15,
                        }}
                    >
                        <ButtonOut onPress={props.closeModal}>
                            <Image
                                source={require('../../assets/appImages/button-out.png')}
                            />
                        </ButtonOut>
                        <Title>
                            {props.type == 'email' ? 
                                'Novo Email'
                            :
                            props.type == 'senha' ?
                                'Nova Senha'
                            :
                                'Deletar Conta'
                            }
                        </Title>
                        <Subtitle>
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
                                <Input label="Digite a senha atual..." value={senhaAtual} onChangeText={(text: SetStateAction<string>) => setsenhaAtual(text)} error={erroSenhaAtual} />
                                <Input label="Digite a nova senha..." value={senhaNova} onChangeText={(text: SetStateAction<string>) => setsenhaNova(text)} error={erroSenhaNova} />
                                <ButtonModal onPress={handleButtonPressPassword}>
                                    <ButtonTextModal>Confirmar</ButtonTextModal>
                                </ButtonModal>
                            </>
                            :
                            <>
                                <ButtonDelete>
                                    <Link href='/login'>
                                        <ButtonTextModal>Deletar</ButtonTextModal>
                                    </Link>
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