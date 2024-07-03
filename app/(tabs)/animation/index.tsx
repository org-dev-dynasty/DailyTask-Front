import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, Easing, StyleSheet, Text } from 'react-native';

export default function Animation() {
    return (
        <View style={styles.container}>
            <Text>Animation</Text>
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

