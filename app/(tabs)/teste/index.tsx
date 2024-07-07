import React, {useRef, useState} from 'react';
import {View, PanResponder, Animated, StyleSheet, Dimensions, Pressable} from 'react-native';
import {Container, LockIcon, LockPill, TopViewLock} from "@/app/(tabs)/home/styles";
import {LockSimpleOpen} from "phosphor-react-native";
import theme from "@/themes/theme";

export default function Teste(){
    const { width, height } = Dimensions.get('window');

    const panY = useRef(new Animated.Value(0)).current;
    const limitY = -(height/2.45 - 100) ; // Defina o ponto até onde o elemento pode subir

    const panMoving = useRef(false);

    const lockPillSize = useRef(new Animated.Value(    height/2.45
    )).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => {
                console.log(panMoving)
                // Verifica se o gesto é um press (toque longo) ou um arrasto
                const isLongPress = gestureState.numberActiveTouches === 1 && gestureState.dx === 0 && gestureState.dy === 0;
                return !isLongPress;
            },
            onMoveShouldSetPanResponder: (event, gestureState) => {
                return Math.abs(gestureState.dx) > 2 || Math.abs(gestureState.dy) > 2; // Inicia o PanResponder se houver um movimento suficiente
            },
            onPanResponderMove: (event, gestureState) => {
                panMoving.current = true;
                if (gestureState.dy < limitY) {
                    panY.setValue(limitY);
                    lockPillSize.setValue(100);
                } else if (gestureState.dy > 0) {
                    panY.setValue(0);
                    lockPillSize.setValue(height/2.45);
                } else {
                    panY.setValue(gestureState.dy);
                    lockPillSize.setValue(height/2.45 + gestureState.dy);
                }
            },
            onPanResponderRelease: (event, gestureState) => {
                if (gestureState.dy > limitY) {
                    Animated.spring(
                        panY,
                        { toValue: 0, useNativeDriver: false }
                    ).start();
                    Animated.spring(
                        lockPillSize,
                        { toValue: height/2.45, useNativeDriver: false }
                    ).start(
                    )
                } else {
                    panY.setValue(limitY);
                }
                panMoving.current = false;
                handlePressOut();
            }
        })
    ).current;

    const handlePress = () => {
        console.log('Pressionou o Pressable');
    };

    const handlePressOut = () => {
        setTimeout(() => {
            if(!panMoving.current) console.log('Soltou');
        },100)
    };

    return (
        <Container>
            <TopViewLock>
                <LockPill {...panResponder.panHandlers} style={{height: lockPillSize}}>
                    <LockIcon>
                        <LockSimpleOpen size={64} color={theme.COLORS.WHITE} />
                    </LockIcon>
                </LockPill>
            </TopViewLock>

            <View style={styles.container}>
                <Animated.View
                    {...panResponder.panHandlers}
                    style={[{ transform: [{ translateY: panY }] }, styles.box]}
                >
                    <Pressable
                        onPressIn={handlePress}
                        onPressOut={handlePressOut}
                        style={styles.pressable}
                    >
                        <View style={styles.pressableContent}>
                            <LockSimpleOpen size={64} color={theme.COLORS.BLACK} />
                        </View>
                    </Pressable>
                </Animated.View>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 200,
    },
    box: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'blue',
    },
    pressable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressableContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});




