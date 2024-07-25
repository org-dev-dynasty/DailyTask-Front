import theme from '@/themes/theme';
import React, { useState } from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import { TaskInputProps } from '@/interfaces/TaskInput';
import {Clock, CalendarBlank, ListPlus} from "phosphor-react-native";
import {CustomInput} from "@/components/customInput/customInput";

export const TaskInput = (props: TaskInputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const Label = <Text style={{color: props.error ? theme.COLORS.NEGATIVE : isFocused ? theme.COLORS.MAIN : theme.COLORS.WHITE}}>{props.label}</Text>;

    const style = {
        backgroundColor: "transparent",
        color: theme.COLORS.WHITE,
        marginTop: -6.2,

    }

    const smallStyle = {
        backgroundColor: "transparent",
        color: theme.COLORS.WHITE,
        marginTop: -6.2,
        height: 36
    }

    const borderColor = props.error ? theme.COLORS.NEGATIVE : isFocused ? theme.COLORS.MAIN : theme.COLORS.WHITE;

    return (
        <>
            <View>
                <CustomInput
                    mode="outlined"
                    label={Label}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    style={props.time || props.date ? Object.assign(smallStyle, props.style) : Object.assign(style, props.style)}
                    cursorColor={theme.COLORS.MAIN}
                    outlineStyle={{ borderColor: props.error ? theme.COLORS.NEGATIVE : isFocused ? theme.COLORS.MAIN : theme.COLORS.WHITE}}
                    theme={{
                        colors: {
                            background: theme.COLORS.NEGATIVE_ALT,
                        },
                    }}
                    placeholder={props.placeholder || 'Digite aqui...'}
                    placeholderTextColor={theme.COLORS.WHITE}
                    textColor={theme.COLORS.WHITE}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    small={props.time || props.date}
                    big={props.description}
                    maxLength={props.maxLength}


                    right={props.time ? <Clock size={32} color={theme.COLORS.MAIN} /> :
                        props.category ?
                            <View style={{borderLeftWidth: 1, borderLeftColor: borderColor, flex: 1, justifyContent: 'center', alignContent: 'center', paddingLeft: 5, paddingBottom: 2.5}}>
                                <TouchableOpacity>
                                    <ListPlus size={32} color={theme.COLORS.MAIN}/>
                                </TouchableOpacity>
                            </View>
                             :
                        props.date ? <CalendarBlank size={32} color={theme.COLORS.MAIN}/> : null}

                />
            </View>
        </>

    )
};