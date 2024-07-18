import { Background } from "@/components/background";
import { Button, Container, Footer, InputContainer, Logo, TextButton, TextContainer, TextFooter, TextInfo, Titulo } from "./styles";
import { Input } from "@/components/input/input";
import { SetStateAction, useState } from "react";
import { View, Text, Image } from "react-native";

export default function NewPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    return (
        <Background>
            <Logo
                source={require('../../assets/appImages/logo-daily-branca.png')}
            />
            <Container>
                <TextContainer>
                    <Titulo>Nova Senha</Titulo>
                    <TextInfo>Crie uma nova senha para a sua conta</TextInfo>
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
                    <TextFooter>Desenvolvido por DevDynasty</TextFooter>
                    <Image
                        source={require('../../assets/appImages/logo-dev-dynasty.png')}
                    />
                </Footer>
            </Container>
            
        </Background>
    )
}