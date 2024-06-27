import React, { useState, SetStateAction, useEffect } from 'react';
import { Background } from "@/components/background";
import { Container, Titulo, TouchableOpacityConta, Text, TextFooter, Logo, ErrorMessage, View } from "./styles";
import { Image, TouchableOpacity } from "react-native"; 
import { Input } from "@/components/input/input";
import { Link } from 'expo-router';
import theme from '@/themes/theme';


export default function SignUp() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [erroSenha, setErroSenha] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [erroNome, setErroNome] = useState('');
    const [erroConfirmarSenha, setErroConfirmarSenha] = useState('');


    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleButtonPress = () => {
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
            setErrorMessage('');
            setNome('');
            setEmail('');
            setSenha('');
            setConfirmarSenha('');
        }
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
                {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
                <TouchableOpacityConta onPress={handleButtonPress}>
                    Criar Conta
                </TouchableOpacityConta>
                <Text>
                    Já tem uma conta?
                    <TouchableOpacity>
                        <Link href='/login' style={{color: theme.COLORS.MAIN}}> Faça seu login</Link>
                    </TouchableOpacity>
                </Text>
                <TextFooter>Desenvolvido por DevDynasty</TextFooter>
                <Image
                    source={require('../../assets/appImages/logo-dev-dynasty.png')}
                />
            </Container>
        </Background>
    )
}
