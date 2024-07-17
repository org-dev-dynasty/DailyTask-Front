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
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erroSenha, setErroSenha] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [erroNome, setErroNome] = useState('');
    const [erroConfirmarSenha, setErroConfirmarSenha] = useState('');
    const [user, setUser] = useState({} as User);
    const { create } = useContext(UserContext);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };


    async function handleButtonPress() {
        if (nome == "") {
            setErroNome('Preencha o campo de nome.')
        } else if (!validateEmail(email)) {
            setErroEmail('Por favor, insira um e-mail válido.');
        } else if (senha.length < 8) {
            setErroSenha('A senha deve ter no mínimo 8 caracteres.');
        } else if (!/[A-Z]/.test(senha)) {
            setErroSenha('A senha deve ter pelo menos uma letra maiúscula.');
        } else if (!/[a-z]/.test(senha)) {
            setErroSenha('A senha deve ter pelo menos uma letra minúscula.');
        } else if (!/\d/.test(senha)) {
            setErroSenha('A senha deve ter pelo menos um número.');
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
            setErroSenha('A senha deve ter pelo menos um caractere especial.');
        } else if (senha !== confirmarSenha) {
            setErroConfirmarSenha('As senhas não coincidem. Por favor, verifique.');
        } else {
            setNome('');
            setEmail('');
            setSenha('');
            setConfirmarSenha('');
        }
        // const user = { nome, email, senha }
        // // const result = await create(user);
        // if(result) { 
        //     await AsyncStorage.setItem('email', email);
        //     console.log('Usuário criado com sucesso')
        // } else {
        //     console.log('Erro ao criar usuário')
        // }
    };

    useEffect(() => {
        if (nome !== '') {
            setErroNome('');
        }
        if (email !== '') {
            setErroEmail('');
        }
        if (senha !== '') {
            setErroSenha('');
        }
        if (confirmarSenha !== '') {
            setErroConfirmarSenha('');
        }
    }, [email, senha, nome, confirmarSenha]);

    return (
        <Background>
            <Logo
                source={require('../../assets/appImages/logo-daily-branca.png')}
            />
            <Container>
                <Titulo>Crie sua Conta</Titulo>
                <View>
                    <Input label="Nome" value={nome} onChangeText={(text: SetStateAction<string>) => setNome(text)} error={erroNome} />
                </View>
                <View>
                    <Input label="Email" value={email} onChangeText={(text: SetStateAction<string>) => setEmail(text)} error={erroEmail}/>
                </View>
                <View>
                    <Input label="Senha" value={senha} onChangeText={(text: SetStateAction<string>) => setSenha(text)} error={erroSenha} hide/>
                </View>
                <View>
                    <Input label="Confirmar Senha" value={confirmarSenha} onChangeText={(text: SetStateAction<string>) => setConfirmarSenha(text)} error={erroConfirmarSenha} hide/>
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