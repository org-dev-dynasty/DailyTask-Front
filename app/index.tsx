import { Background } from "@/components/background";
import { Input } from "@/components/input/input";
import { Link } from "expo-router";
import { SetStateAction, useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";

export default function Index() {
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [erroSenha, setErroSenha] = useState('');
    const [erroEmail, setErroEmail] = useState('');

    function testeInput() {
        if (email === '') {
            console.log('Nome vazio');
            setErroEmail('Email vazio');
            return;
        }
        if (senha === '') {
            console.log('Senha vazia');
            setErroSenha('Senha vazia');
            return;
        }
    }

    useEffect(() => {
        if (email !== '') {
            setErroEmail('');
        }
        if (senha !== '') {
            setErroSenha('');
        }
    }, [email, senha]);

    return (
        <>
        <Background>
            <View style={{flex: 1, width: '100%', height: '100%', justifyContent: "center", padding:16, gap:16}}>
                <Link href="/home" style={{textAlign: "center", fontSize: 32, borderColor: "black", borderWidth: 2, borderRadius: 15, padding:2}}>Ir para as telas principais</Link>
                <Link href="/login" style={{textAlign: "center", fontSize: 32, borderColor: "black", borderWidth: 2, borderRadius: 15, padding:2}}>Ir para o Login</Link>
                <Link href="/animation" style={{textAlign: "center", fontSize: 32, borderColor: "black", borderWidth: 2, borderRadius: 15, padding:2}}>Teste</Link>


                <Input label="Email" value={email} onChangeText={(text: SetStateAction<string>) => setEmail(text)} error={erroEmail}/>
                <Input label="Senha" value={senha} onChangeText={(text: SetStateAction<string>) => setSenha(text)} error={erroSenha} hide/>
                <TouchableOpacity onPress={testeInput} style={{backgroundColor: "blue", padding: 16, borderRadius: 15}}><Text>Teste</Text></TouchableOpacity>
            </View>
        </Background>
        </>
    );
}