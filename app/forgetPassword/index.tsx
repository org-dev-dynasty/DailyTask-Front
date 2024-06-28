import { Background } from "@/components/background";
import { Logo, Titulo, Container, Text, View, TouchableOpacityEnviar, ButtonText, TextFooter, ViewFooter, ContainerCadastro, Details } from "./styles";
import { Input } from "@/components/input/input";
import { SetStateAction, useEffect, useState } from "react";
import { Image } from "react-native";
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
                    <ButtonText>Enviar</ButtonText>
                </TouchableOpacityEnviar>
                <ContainerCadastro>
                    <TextFooter>
                        <Link href='/signUp'>Novo por aqui? <Details>Crie sua conta</Details></Link>
                    </TextFooter>
                </ContainerCadastro>
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