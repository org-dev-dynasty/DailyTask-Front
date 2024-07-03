import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, Alert, Button } from 'react-native';
import theme from '@/themes/theme';
import { Microphone } from "phosphor-react-native";
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';

export default function Animation() {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [recordingFileUri, setRecordingFileUri] = useState<string | null>(null);

    async function handleRecordingStart(){
        const {granted} = await Audio.getPermissionsAsync();
        if(granted){
            try {
                const { recording } = await Audio.Recording.createAsync();
                setRecording( recording );
            } catch (error) {
                console.log(error);
                Alert.alert('Erro ao gravar', 'Ocorreu um erro ao tentar gravar o áudio');
            }
        }
    }

    async function handleRecordingStop(){
        try {
            if(recording){
                await recording.stopAndUnloadAsync();
                const fileUri = recording.getURI();
                console.log(fileUri);
                setRecordingFileUri(fileUri);
                setRecording(null);
            }
        }
        catch (error) {
            console.log(error);
            Alert.alert('Erro ao pausa', 'Ocorreu um erro ao tentar parar a gravação do áudio');
        }
    }

    async function handlePlayAudio(){
        if(recordingFileUri){
            const {sound} = await Audio.Sound.createAsync({uri: recordingFileUri}, {shouldPlay: true});
            
            await sound.setPositionAsync(0);
            await sound.playAsync();

        }
    }

    useEffect(() => {
        Audio
        .requestPermissionsAsync()
        .then(({ granted }) => {
            if (granted) {
                Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    interruptionModeIOS: InterruptionModeIOS.DoNotMix,
                    playsInSilentModeIOS: true,
                    shouldDuckAndroid: true,
                    interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
                    playThroughEarpieceAndroid: true,
                })
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            <Pressable 
                onPressIn={handleRecordingStart}
                onPressOut={handleRecordingStop}
            >
                <View style={{backgroundColor: theme.COLORS.MAIN, width: 100, height:100, borderRadius: 90, justifyContent: 'center', alignItems: 'center'}}>
                    <Microphone size={64} weight="fill" color="#ffffff" />
                </View>
            </Pressable>
            <Text style={{color: theme.COLORS.MAIN, fontSize: 24, marginVertical: 20}}>{recording ? 'Gravando...' : 'Esperando...'}</Text>
            <Button title="Ouvir Audio" onPress={handlePlayAudio}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
});

