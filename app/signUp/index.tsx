import React, { useState, SetStateAction, useEffect, useContext, useCallback } from 'react';
import { Background } from "@/components/background";
import { Container, Titulo, TouchableOpacityConta, TextFooter, Logo, View, ButtonText, ContainerLogin, Details, Footer, CheckBoxContainer, CheckBoxText, CheckBoxTextTerms, ModalContainer, ModalView, ModalText, CheckBoxTextTermsTouchable} from "./styles";
import { Image, ScrollView, TouchableOpacity } from "react-native"; 
import { Input } from "@/components/input/input";
import { Link, router, useFocusEffect } from 'expo-router';
import { X } from 'phosphor-react-native';
import { Checkbox } from 'react-native-paper';
import { UserContext } from '../../context/user_context';
import { User } from '@/@clean/shared/domain/entities/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '@/themes/theme';


export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorName, setErrorName] = useState('');
    const [errorConfPassword, setErrorConfPassword] = useState('');
    const [acceptedTermsModalOpen, setAcceptedTermsModalOpen] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [acceptedNotificationsEmail, setAcceptedNotificationsEmail] = useState(false);
    const [themeModeS, setThemeModeS] = useState('dark');

    const [user, setUser] = useState({} as User);
    const { create } = useContext(UserContext);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    async function handleButtonPress() {
        if (name == "") {
            setErrorName('Preencha o campo de nome.')
        } else if (!validateEmail(email)) {
            setErrorEmail('Por favor, insira um e-mail válido.');
        } else if (password.length < 8) {
            setErrorPassword('A senha deve ter no mínimo 8 caracteres.');
        } else if (!/[A-Z]/.test(password)) {
            setErrorPassword('A senha deve ter pelo menos uma letra maiúscula.');
        } else if (!/[a-z]/.test(password)) {
            setErrorPassword('A senha deve ter pelo menos uma letra minúscula.');
        } else if (!/\d/.test(password)) {
            setErrorPassword('A senha deve ter pelo menos um número.');
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setErrorPassword('A senha deve ter pelo menos um caractere especial.');
        } else if (password !== confPassword) {
            setErrorConfPassword('As senha não coincidem. Por favor, verifique.');
        } else if (!acceptedTerms) {
            alert('Aceite os termos de uso')
        } else if (!acceptedNotificationsEmail) {
            alert('Aceite as notificações por email')
        } else {
            const user = new User(null, name, email, password, null, acceptedTerms, acceptedNotificationsEmail);
            const result = await create(user);
            if(result) { 
                await AsyncStorage.setItem('email', email);
                router.replace('/emailConfirm');
            } else {
                alert('Erro ao criar usuário');
                console.log('Erro ao criar usuário')
            }
        }
    };

    useEffect(() => {
        if (name !== '') {
            setErrorName('');
        }
        if (email !== '') {
            setErrorEmail('');
        }
        if (password !== '') {
            setErrorPassword('');
        }
        if (confPassword !== '') {
            setErrorConfPassword('');
        }
    }, [email, password, name, confPassword]);

    useFocusEffect(
        useCallback(() => {
          AsyncStorage.getItem('themeMode').then((value) => {
            console.log(themeModeS)
            if (value) {
              console.log('value ' + value)
              setThemeModeS(value);
            }
          });
        }, [themeModeS])
      );

    return (
        <Background>
            <ModalContainer style={{display: acceptedTermsModalOpen ? 'flex' : 'none'}}>
                <ModalView style={{backgroundColor: themeModeS === 'dark' ? theme.COLORS.NEGATIVE_ALT : theme.COLORS.WHITE}}>
                    <TouchableOpacity onPress={() => setAcceptedTermsModalOpen(false)} style={{position: 'absolute', right: 12, top: 12}}>
                        <X color={theme.COLORS.NEGATIVE}/>
                    </TouchableOpacity>
                    <ScrollView>
                        <ModalText style={{color: themeModeS === 'dark' ? theme.COLORS.WHITE : theme.COLORS.BLACK, borderColor: themeModeS === 'dark' ? theme.COLORS.WHITE : theme.COLORS.BLACK }}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing 
                            elit. Explicabo, repudiandae quae. Inventore, deleniti, natus 
                            illo fugiat quasi magni fugit, nam ullam rerum sunt minus adipisci 
                            laudantium? Minima enim odio inventore. Lorem ipsum dolor sit amet 
                            consectetur adipisicing elit. Ullam nam incidunt est asperiores sequi, 
                            voluptas sit illo, aliquam repellendus corrupti numquam! Error quas enim rerum ut, 
                            earum iure facere consequatur. Lorem ipsum dolor sit amet consectetur, adipisicing 
                            elit. Fugiat ratione, harum qui quis recusandae totam voluptas blanditiis neque sint 
                            porro! Molestiae sequi aspernatur officiis ipsam? Ipsam ea consequatur repellat molestias! 
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat, hic! Atque unde, 
                            nostrum voluptatibus tempora eius eos perferendis temporibus ex quis. Quidem vel neque 
                            recusandae suscipit. Voluptas nulla nam magnam.
                        </ModalText>
                    </ScrollView>
                </ModalView>
            </ModalContainer>
            <Logo
                source={themeModeS === 'dark' 
                    ? require('../../assets/appImages/logo-daily-branca.png') 
                    : require('../../assets/appImages/logo-daily-preta.png')}
            />
            <Container>
                <Titulo style={{color: themeModeS === 'dark' ? '#ffffff' : '#000000'}}>Crie sua Conta</Titulo>
                <View>
                    <Input label="Nome" value={name} onChangeText={(text: SetStateAction<string>) => setName(text)} error={errorName} />
                </View>
                <View>
                    <Input label="Email" value={email} onChangeText={(text: SetStateAction<string>) => setEmail(text)} error={errorEmail}/>
                </View>
                <View>
                    <Input label="Senha" value={password} onChangeText={(text: SetStateAction<string>) => setPassword(text)} error={errorPassword} hide/>
                </View>
                <View>
                    <Input label="Confirmar senha" value={confPassword} onChangeText={(text: SetStateAction<string>) => setConfPassword(text)} error={errorConfPassword} hide/>
                </View>
                <View style={{marginBottom: 12}}>
                    <CheckBoxContainer>
                        <Checkbox
                          status={acceptedTerms ? 'checked' : 'unchecked'}
                          onPress={() => {
                            setAcceptedTerms(!acceptedTerms);
                          }}
                        />
                        <CheckBoxText style={{color: themeModeS === 'dark' ? '#ffffff' : '#000000'}}>Aceito os <CheckBoxTextTerms onPress={() => setAcceptedTermsModalOpen(true)}>termos de uso</CheckBoxTextTerms></CheckBoxText>
                    </CheckBoxContainer>
                    <CheckBoxContainer>
                        <Checkbox
                          status={acceptedNotificationsEmail ? 'checked' : 'unchecked'}
                          onPress={() => {
                            setAcceptedNotificationsEmail(!acceptedNotificationsEmail);
                          }}
                        />
                        <CheckBoxText style={{color: themeModeS === 'dark' ? '#ffffff' : '#000000'}}>Aceito receber notificações via email</CheckBoxText>
                    </CheckBoxContainer>
                </View>
                <TouchableOpacityConta onPress={handleButtonPress}>
                    <ButtonText>Criar Conta</ButtonText>
                </TouchableOpacityConta>
                <ContainerLogin>
                    <TextFooter>
                        <Link href='/login' style={{color: themeModeS === 'dark' ? '#ffffff' : '#000000'}}>Já tem uma conta? <Details>Faça seu login</Details></Link>
                    </TextFooter>
                </ContainerLogin>
                <Footer>
                    <TextFooter style={{color: themeModeS === 'dark' ? '#ffffff' : '#000000'}}>Desenvolvido por DevDynasty</TextFooter>
                    <Image
                        source={require('../../assets/appImages/logo-dev-dynasty.png')}
                    />
                </Footer>
            </Container>
        </Background>
    )
}