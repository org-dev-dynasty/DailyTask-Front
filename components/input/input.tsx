import theme from '@/themes/theme';
import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Text, View } from "react-native";
import { InputProps } from '@/interfaces/Input/index';

export const Input = (props: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(props.hide);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const Label = <Text style={{color: props.error ? theme.COLORS.NEGATIVE : isFocused ? theme.COLORS.MAIN : theme.COLORS.WHITE}}>{props.label}</Text>;

    return (
        <>
        <View>
            <TextInput
              mode="outlined"
              label={Label}
              value={props.value}
              onChangeText={props.onChangeText}
              style={{ backgroundColor: "transparent", color: theme.COLORS.WHITE}}
              outlineStyle={{ borderColor: props.error ? theme.COLORS.NEGATIVE : isFocused ? theme.COLORS.MAIN : theme.COLORS.WHITE}}
              theme={{
                colors: {
                  background: theme.COLORS.NEGATIVE_ALT,
                },
              }}
              placeholder='Digite aqui...'
              placeholderTextColor={theme.COLORS.WHITE}
              textColor={theme.COLORS.WHITE}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              secureTextEntry={showPassword}
              // right={props.hide ? <TextInput.Icon icon={showPassword ? "eye-off" : "eye"} color={theme.COLORS.WHITE} onPress={togglePasswordVisibility} /> : null}
            />
            <Text style={{color: theme.COLORS.NEGATIVE}}>{props.error}</Text>
        </View>
        </>
        
    )
};