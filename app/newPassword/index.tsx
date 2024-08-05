import { Background } from "@/components/background";
import { Button, Container, Footer, InputContainer, Logo, TextButton, TextContainer, TextFooter, TextInfo, Titulo } from "./styles";
import { Input } from "@/components/input/input";
import { SetStateAction, useCallback, useState } from "react";
import { View, Text, Image } from "react-native";
import { useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import theme from "@/themes/theme";

export default function NewPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [themeModeS, setThemeModeS] = useState('dark');

    useFocusEffect(
        useCallback(() => {
          AsyncStorage.getItem('themeMode').then((value) => {
            console.log(themeModeS)
            if (value) {
              console.log('value ' + value)
              setThemeModeS(value);
            }
          });
        }, [])
      );

    return (
        <Background>
            <Logo
                source={themeModeS === 'dark' 
                    ? require('../../assets/appImages/logo-daily-branca.png') 
                    : require('../../assets/appImages/logo-daily-preta.png')}
            />
            <Container>
                <TextContainer>
                    <Titulo style={{color: themeModeS === 'dark' ? theme.COLORS.WHITE : theme.COLORS.BLACK}}>Nova Senha</Titulo>
                    <TextInfo style={{color: themeModeS === 'dark' ? theme.COLORS.WHITE : theme.COLORS.BLACK}}>Crie uma nova senha para a sua conta</TextInfo>
                </TextContainer>

                <InputContainer>
                    <Input label="Nova Senha" value={password} onChangeText={(text: SetStateAction<string>) => setPassword(text)} error={error} hide/>
                </InputContainer>

                <InputContainer>
                    <Input label="Confirmar Senha" value={confirmPassword} onChangeText={(text: SetStateAction<string>) => setConfirmPassword(text)} error={error} hide/>
                </InputContainer>
                
                <Button>
                    <TextButton>Enviar</TextButton>
                </Button>

                <Footer>
                    <TextFooter style={{color: themeModeS === 'dark' ? theme.COLORS.WHITE : theme.COLORS.BLACK}}>Desenvolvido por DevDynasty</TextFooter>
                    <Image
                        source={require('../../assets/appImages/logo-dev-dynasty.png')}
                    />
                </Footer>
            </Container>
            
        </Background>
    )
}