import React, { useState, useRef, useEffect } from 'react';
import { Animated, Easing, StyleSheet, TouchableOpacity } from 'react-native';
import { Sun, Moon } from 'phosphor-react-native';
import theme from '@/themes/theme';

const CustomToggleSwitch = () => {
    const [tema, setTema] = useState(false);
    const animatedValue = useRef(new Animated.Value(tema ? 1 : 0)).current;

    const toggleSwitch = () => {
        setTema(!tema);
        Animated.timing(animatedValue, {
            toValue: tema ? 0 : 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: tema ? 1 : 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, [tema]);

    const interpolatedThumbPosition = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-16, 16], 
    });

    return (
        <TouchableOpacity onPress={toggleSwitch} style={[styles.container, { backgroundColor: tema ? '#2F2F2F' : theme.COLORS.MAIN }]}>
            <Sun color="white" size={25} style={{ position: 'absolute', right: 5, display: tema ? 'none' : 'flex' }} />
            <Moon color="white" size={25} style={{ position: 'absolute', left: 5, display: tema ? 'flex' : 'none' }} />
            <Animated.View style={[styles.thumb, { transform: [{ translateX: interpolatedThumbPosition }] }]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 70,
        height: 35,
        borderRadius: 90,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        position: 'relative',
    },
    thumb: {
        width: 28,
        height: 28,
        backgroundColor: theme.COLORS.WHITE,
        borderRadius: 14,
        position: 'absolute',
        top: 3.5, 
    },
});

export default CustomToggleSwitch;
