import React, { useState, SetStateAction, useEffect, useContext } from 'react';
import { Background } from "@/components/background";
import { Container, Titulo, TouchableOpacityConta, TextFooter, Logo, View, ButtonText, ContainerLogin, Details, Footer} from "./styles";
import { Image } from "react-native"; 
import { Input } from "@/components/input/input";
import { Link } from 'expo-router';
import theme from '@/themes/theme';
import { UserContext } from '../../context/user_context';
import { User } from '@/@clean/shared/domain/entities/user';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorName, setErrorName] = useState('');
    const [errorConfPassword, setErrorConfPassword] = useState('');
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
        } else {
            setName('');
            setEmail('');
            setPassword('');
            setConfPassword('');
        }
        // const user = { name, email, password }
        // // const result = await create(user);
        // if(result) { 
        //     await AsyncStorage.setItem('email', email);
        //     console.log('Usuário criado com sucesso')
        // } else {
        //     console.log('Erro ao criar usuário')
        // }
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

    return (
        <Background>
            <Logo
                source={require('../../assets/appImages/logo-daily-branca.png')}
            />
            <Container>
                <Titulo>Crie sua Conta</Titulo>
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
                <TouchableOpacityConta onPress={handleButtonPress}>
                    <ButtonText>Criar Conta</ButtonText>
                </TouchableOpacityConta>
                <ContainerLogin>
                    <TextFooter>
                        <Link href='/login'>Já tem uma conta? <Details>Faça seu login</Details></Link>
                    </TextFooter>
                </ContainerLogin>
                <Footer>
                    <TextFooter>Desenvolvido por DevDynasty</TextFooter>
                    <Image
                        source={require('../../assets/appImages/logo-dev-dynasty.png')}
                    />
                </Footer>
            </Container>
        </Background>
    )
}