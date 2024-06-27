import { Background } from "@/components/background";
import { Logo, Titulo, Container, Text, View, TouchableOpacityEnviar, TextLink, TextFooter, ViewFooter } from "./styles";
import { Input } from "@/components/input/input";
import { SetStateAction, useEffect, useState } from "react";
import { TouchableOpacity, Image } from "react-native";
import theme from "@/themes/theme";
import { Link } from "expo-router";

export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleButtonPress = () => {
        if ( email == '') {
            setErroEmail('Preencha o campo abaixo.')
        } else if (!validateEmail(email)) {
            setErroEmail('Por favor, insira um e-mail válido.');
        } else {
            setEmail('');
        }
    }

    useEffect(() => {
        if (email !== '') {
            setErroEmail('');
        }
    }, [email]);

    return(
        <Background>
            <Logo
                source={require('../../assets/appImages/logo-daily-branca.png')}
            />
            <Container>
                <Titulo>Esqueci a senha</Titulo>
                <Text>Insira o e-mail da sua conta para enviarmos o código de verificação.</Text>
                <View>
                    <Input label="Email" value={email} onChangeText={(text: SetStateAction<string>) => setEmail(text)} error={erroEmail}/>
                </View>
                <TouchableOpacityEnviar onPress={handleButtonPress}>
                    Enviar
                </TouchableOpacityEnviar>
                <TextLink>
                    Novo por aqui?
                    <TouchableOpacity>
                        <Link href='/signUp' style={{color: theme.COLORS.MAIN}}> Crie sua conta</Link>
                    </TouchableOpacity>
                </TextLink>
                <ViewFooter>
                    <TextFooter>Desenvolvido por DevDynasty</TextFooter>
                    <Image
                        source={require('../../assets/appImages/logo-dev-dynasty.png')}
                    />
                </ViewFooter>
            </Container>
        </Background>
    )
}