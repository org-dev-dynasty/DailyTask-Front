import theme from '@/themes/theme';
import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Text } from "react-native";

export const Input = (props: any) => {
    const [text, setText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const Label = <Text style={{color: isFocused ? theme.COLORS.MAIN : theme.COLORS.WHITE}}>{props.label}</Text>;

    return (
        <TextInput
          mode="outlined"
          label={Label}
          value={text}
          onChangeText={text => setText(text)}
          style={{ backgroundColor: "transparent", color: theme.COLORS.WHITE}}
          outlineStyle={{ borderColor: isFocused ? theme.COLORS.MAIN : theme.COLORS.WHITE}}
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
        />
    )
};