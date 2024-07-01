import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

import { Microphone, Keyboard, LockSimpleOpen } from "phosphor-react-native";

export default function Animation() {
    const animation = useRef(new Animated.Value(100)).current; // Initial height of the circle
    const icon1Ref = useRef(null);
    const icon2Ref = useRef(null);
    const margin = 20; // Margin between the icons and the circle
    const iconDistanceFromCenter = 50; // Distance of the icons from the center of their respective halves

    const handleLayout = () => {
        if (icon1Ref.current && icon2Ref.current) {
            icon1Ref.current.measure((x, y, width, height, pageX, pageY) => {
                const icon1Y = pageY;
                if (icon2Ref.current) {
                    icon2Ref.current.measure((x2, y2, width2, height2, pageX2, pageY2) => {
                        const icon2Y = pageY2;
                        const heightDiff = icon2Y - icon1Y + height + margin * 2; // Adding margin for both sides

                        if (isNaN(heightDiff)) {
                            console.error("Calculated height is NaN. Values:", { icon1Y, icon2Y, height, margin, heightDiff });
                        } else {
                            // Start the animation
                            Animated.timing(animation, {
                                toValue: heightDiff,
                                duration: 1000,
                                easing: Easing.linear,
                                useNativeDriver: false,
                            }).start();
                        }
                    });
                }
            });
        }
    };

    useEffect(() => {
        // Measure the icons once the layout is rendered
        const timeoutId = setTimeout(handleLayout, 100);

        // Clean up timeout on unmount
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.circle,
                    {
                        height: animation,
                    },
                ]}
            />
            <View
                ref={icon1Ref}
                style={[
                    styles.iconContainer,
                    { top: 0, transform: [{ translateY: iconDistanceFromCenter }] }
                ]}
                onLayout={handleLayout}
            >
                <LockSimpleOpen size={64} />
            </View>
            <View
                ref={icon2Ref}
                style={[
                    styles.iconContainer,
                    { bottom: 0, transform: [{ translateY: -iconDistanceFromCenter }] }
                ]}
                onLayout={handleLayout}
            >
                <Microphone size={64} />
            </View>
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
    iconContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
    },
    circle: {
        width: 100,
        borderRadius: 50, // Adjust to be half of the width for a perfect circle
        backgroundColor: 'red',
        position: 'absolute',
        top: 0,
    },
});

