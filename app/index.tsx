import { Background } from "@/components/background";
import CategoryModal from "@/components/categoryModal";
import { Input } from "@/components/input/input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Link } from "expo-router";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";

export default function Index() {
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [erroSenha, setErroSenha] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

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

    const handleConfirm = (name: any, color: any) => {
        console.log('Categoria criada:', name, color);
        setModalVisible(false);
    };

    function clearSotorage() {
        AsyncStorage.clear();
    }

    return (
        <>
        <Background>
            <View style={{flex: 1, width: '100%', height: '100%', justifyContent: "center", padding:16, gap:16}}>
            <Link href="/calendar" style={{textAlign: "center", fontSize: 32, borderColor: "black", borderWidth: 2, borderRadius: 15, padding:2}}>Ir para as telas calendario</Link>
                <Link href="/home" style={{textAlign: "center", fontSize: 32, borderColor: "black", borderWidth: 2, borderRadius: 15, padding:2}}>Ir para as telas principais</Link>
                <Link href="/login" style={{textAlign: "center", fontSize: 32, borderColor: "black", borderWidth: 2, borderRadius: 15, padding:2}}>Ir para o Login</Link>
                <Link href="/configs" style={{textAlign: "center", fontSize: 32, borderColor: "black", borderWidth: 2, borderRadius: 15, padding:2}}>Ir para Configuração</Link>
                <Input label="Email" value={email} onChangeText={(text: SetStateAction<string>) => setEmail(text)} error={erroEmail}/>
                <Input label="Senha" value={senha} onChangeText={(text: SetStateAction<string>) => setSenha(text)} error={erroSenha} hide/>
                <TouchableOpacity onPress={testeInput} style={{backgroundColor: "blue", padding: 16, borderRadius: 15}}><Text>Teste</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={{backgroundColor: "green", padding: 16, borderRadius: 15}}><Text>Adicionar Categoria</Text></TouchableOpacity>   
                <TouchableOpacity onPress={clearSotorage} style={{backgroundColor: "red", padding: 16, borderRadius: 15}}><Text>Limpar Storage</Text></TouchableOpacity>
            </View>
        </Background>
        <CategoryModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onConfirm={handleConfirm}
            />
            
        </>
    );
}