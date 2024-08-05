import { Background } from "@/components/background";
import { Logo, Titulo, Container, Text, View, TouchableOpacityEnviar, ButtonText, TextFooter, ViewFooter, ContainerCadastro, Details } from "./styles";
import { Input } from "@/components/input/input";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { Image } from "react-native";
import { Link, router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [themeModeS, setThemeModeS] = useState('dark');
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    async function handleButtonPress() {
        if ( email == '') {
            setErroEmail('Preencha o campo abaixo.')
        } else if (!validateEmail(email)) {
            setErroEmail('Por favor, insira um e-mail válido.');
        } else {
            await AsyncStorage.setItem('email', email);
            router.replace('/emailConfirm');
        }
    }

    useEffect(() => {
        if (email !== '') {
            setErroEmail('');
        }
    }, [email]);

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

    return(
        <Background>
            <Logo
                source={themeModeS === 'dark' 
                    ? require('../../assets/appImages/logo-daily-branca.png') 
                    : require('../../assets/appImages/logo-daily-preta.png')}
            />
            <Container>
                <Titulo style={{color: themeModeS === 'dark' ? '#ffffff' : '#000000'}}>Esqueci a senha</Titulo>
                <Text style={{color: themeModeS === 'dark' ? '#ffffff' : '#000000'}}>Insira o e-mail da sua conta para enviarmos o código de verificação.</Text>
                <View>
                    <Input label="Email" value={email} onChangeText={(text: SetStateAction<string>) => setEmail(text)} error={erroEmail}/>
                </View>
                <TouchableOpacityEnviar onPress={handleButtonPress}>
                    <ButtonText>Enviar</ButtonText>
                </TouchableOpacityEnviar>
                <ContainerCadastro>
                    <TextFooter>
                        <Link href='/signUp' style={{color: themeModeS === 'dark' ? '#ffffff' : '#000000'}}>Novo por aqui? <Details>Crie sua conta</Details></Link>
                    </TextFooter>
                </ContainerCadastro>
                <ViewFooter>
                    <TextFooter style={{color: themeModeS === 'dark' ? '#ffffff' : '#000000'}}>Desenvolvido por DevDynasty</TextFooter>
                    <Image
                        source={require('../../assets/appImages/logo-dev-dynasty.png')}
                    />
                </ViewFooter>
            </Container>
        </Background>
    )
}