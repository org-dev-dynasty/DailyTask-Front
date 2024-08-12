import { Background } from "@/components/background";
import { Logo, Titulo, Container, Text, View, TouchableOpacityEnviar, ButtonText, TextFooter, ViewFooter, ContainerCadastro, Details } from "./styles";
import { Input } from "@/components/input/input";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { Image } from "react-native";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "@/context/user_context";

export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const { forgotPassword } = useContext(UserContext);

    async function handleButtonPress() {
        if ( email == '') {
            setErroEmail('Preencha o campo abaixo.')
        } else if (!validateEmail(email)) {
            setErroEmail('Por favor, insira um e-mail válido.');
        } else {
            const resp = await forgotPassword(email);
            console.log(resp);
            await AsyncStorage.setItem('email', email);
            router.replace('/login');
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
                <Text>Insira o e-mail da sua conta para enviarmos as instruções para a troca de senha.</Text>
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