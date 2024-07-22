import { Background } from "@/components/background";
import { BackButton, ButtonContainer, ButtonText, CharInput, Container, InputsContainer, Logo, MainText, SecondText, SendButton, TextFooter, TextsContainer, ViewFooter } from "./styles";
import { View, Image, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData, TextInputChangeEventData } from "react-native";
import { useEffect, useRef, useState, MutableRefObject, useContext } from "react";
import { UserContext } from "@/context/user_context";
import { router } from "expo-router";

export default function EmailConfirm() {
    const [email, setEmail] = useState('');
    const [char1, setChar1] = useState('');
    const [char2, setChar2] = useState('');
    const [char3, setChar3] = useState('');
    const [char4, setChar4] = useState('');
    const [char5, setChar5] = useState('');
    const [char6, setChar6] = useState('');

    const char1Ref = useRef<TextInput>(null);
    const char2Ref = useRef<TextInput>(null);
    const char3Ref = useRef<TextInput>(null);
    const char4Ref = useRef<TextInput>(null);
    const char5Ref = useRef<TextInput>(null);
    const char6Ref = useRef<TextInput>(null);

    const { comfirmEmail } = useContext(UserContext);

    async function verifyCode() {
        if (char1 === '' || char2 === '' || char3 === '' || char4 === '' || char5 === '' || char6 === '') {
            return;
        } else {
            const code = char1 + char2 + char3 + char4 + char5 + char6;
            const result = await comfirmEmail(email, code);
            if (result.message === 'User email has been confirmed!') {
                alert('Email confirmado com sucesso!');
                router.replace('/newPassord');
            } else {
                alert('Código inválido. Por favor, tente novamente.');
            }
        }
    }

    useEffect(() => {
        verifyCode();
    }, [char1, char2, char3, char4, char5, char6]);

    const handleInputChange = (
        setChar: React.Dispatch<React.SetStateAction<string>>, 
        value: string, 
        nextRef: MutableRefObject<TextInput | null> | null
    ) => {
        setChar(value);
        if (value && nextRef && nextRef.current) {
            nextRef.current.focus();
        }
    };

    const handleKeyPress = (
        setChar: React.Dispatch<React.SetStateAction<string>>, 
        value: string, 
        previousRef: MutableRefObject<TextInput | null> | null, 
        event: NativeSyntheticEvent<TextInputKeyPressEventData>
    ) => {
        if (event.nativeEvent.key === 'Backspace' && !value && previousRef && previousRef.current) {
            previousRef.current.focus();
        }
        setChar(value);
    };

    return (
        <Background>
            <Logo
                source={require('../../assets/appImages/logo-daily-branca.png')}
            />
            <Container>
                <TextsContainer>
                    <MainText>Verificação</MainText>
                    <SecondText>Insira o código de verificação enviado para o seu e-mail.</SecondText>
                </TextsContainer>
                <InputsContainer>
                    <CharInput
                        ref={char1Ref}
                        maxLength={1}
                        value={char1}
                        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => handleInputChange(setChar1, e.nativeEvent.text, char2Ref)}
                        onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) => handleKeyPress(setChar1, char1, null, e)}
                    />
                    <CharInput
                        ref={char2Ref}
                        maxLength={1}
                        value={char2}
                        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => handleInputChange(setChar2, e.nativeEvent.text, char3Ref)}
                        onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) => handleKeyPress(setChar2, char2, char1Ref, e)}
                    />
                    <CharInput
                        ref={char3Ref}
                        maxLength={1}
                        value={char3}
                        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => handleInputChange(setChar3, e.nativeEvent.text, char4Ref)}
                        onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) => handleKeyPress(setChar3, char3, char2Ref, e)}
                    />
                    <CharInput
                        ref={char4Ref}
                        maxLength={1}
                        value={char4}
                        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => handleInputChange(setChar4, e.nativeEvent.text, char5Ref)}
                        onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) => handleKeyPress(setChar4, char4, char3Ref, e)}
                    />
                    <CharInput
                        ref={char5Ref}
                        maxLength={1}
                        value={char5}
                        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => handleInputChange(setChar5, e.nativeEvent.text, char6Ref)}
                        onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) => handleKeyPress(setChar5, char5, char4Ref, e)}
                    />
                    <CharInput
                        ref={char6Ref}
                        maxLength={1}
                        value={char6}
                        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => handleInputChange(setChar6, e.nativeEvent.text, null)}
                        onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) => handleKeyPress(setChar6, char6, char5Ref, e)}
                    />
                </InputsContainer>
                <ButtonContainer>
                    <SendButton><ButtonText>Enviar Código</ButtonText></SendButton>
                    <BackButton><ButtonText>Voltar</ButtonText></BackButton>
                </ButtonContainer>
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
