import { Background } from "@/components/background";
import { useEffect } from "react";
import { useRouter } from 'expo-router';
import { ActivityIndicator, Animated, Image, Text } from 'react-native';
import { View } from "./forgetPassword/styles";
import theme from "@/themes/theme";

export default function Index() {
    const logo = require('../assets/appImages/logo-daily-branca.png');
    const dev = require('../assets/appImages/logo-dev-dynasty.png');

    return (
        <Background>
            <View style={{height: '50%', flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                <Image source={logo}  />
            </View>
            <View style={{height: '35%', flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <ActivityIndicator color={theme.COLORS.MAIN} size={80}></ActivityIndicator>
            </View>
            <View style={{height: '15%', flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                <Text style={{fontFamily: theme.FONT_FAMILY.REGULAR, color: theme.COLORS.WHITE, fontSize: 16}}>Desenvolvido por DevDynasty</Text>
                <Image source={dev} />
            </View>
        </Background>
    );
}
