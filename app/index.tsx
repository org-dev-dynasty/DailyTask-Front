import { Background } from "@/components/background";
import { useEffect } from "react";
import { useRouter } from 'expo-router';
import { Animated, Image, Text } from 'react-native';
import { View } from "./forgetPassword/styles";
import theme from "@/themes/theme";

export default function Index() {
    const router = useRouter();
    const logo = require('../assets/appImages/logo-daily-branca.png');
    const dev = require('../assets/appImages/logo-dev-dynasty.png');
    
    const spinValue = new Animated.Value(0);
    const rotate = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true
            })
        ).start();
    }, []);

    // useEffect(() => {
    //     // Simule uma carga de dados ou verificação de autenticação
    //     setTimeout(() => {
    //       // Redirecione para a tela principal após a conclusão do carregamento
    //       router.push('/home'); // Altere '/home' para a sua rota principal
    //     }, 2000); // Exemplo de 2 segundos de espera
    //   }, []);

    return (
        <Background>
            <View style={{height: '50%', flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                <Image source={logo}  />
            </View>
            <View style={{height: '35%', flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <View style={{width: 100, height: 100, borderRadius: 360, borderWidth: 8, borderColor: '#FFA183'}}>
                    <Animated.View style={{transform: [{rotate}], height: 100, width: 100}}>     
                        <View style={{width: 10, height: 10, borderRadius: 360, backgroundColor: theme.COLORS.MAIN}}></View>
                    </Animated.View>    
                </View>
            </View>
            <View style={{height: '15%', flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                <Text style={{fontFamily: theme.FONT_FAMILY.REGULAR, color: theme.COLORS.WHITE, fontSize: 16}}>Desenvolvido por DevDynasty</Text>
                <Image source={dev} />
            </View>
        </Background>
    );
}
