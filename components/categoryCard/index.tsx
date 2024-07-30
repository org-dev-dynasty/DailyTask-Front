import {View, Dimensions, TouchableOpacity} from "react-native";
import {Title} from "@/components/categoryCard/styles";
import {CategoryCardProps} from "@/interfaces/CategoryCard";

export const CategoryCard = (props: CategoryCardProps) => {
    const { height } = Dimensions.get('window');
    const hexToRgb = (hex: string) => {
        hex = hex.replace(/^#/, '');

        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        return { r, g, b };
    };

    const { r, g, b } = hexToRgb(props.color2);

    const textColor = (r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000' : '#fff');

    return (
        <TouchableOpacity onPress={props.close}>
            <View style={{flexDirection: "row", justifyContent: 'center', marginVertical: 6}}>
                <View style={{width: '8%', height: height/15, backgroundColor: props.color, borderTopLeftRadius: 12, borderBottomLeftRadius: 12}}></View>
                <View
                    style={{width: '85%', height: height/15, backgroundColor: props.color2, borderTopRightRadius: 12, borderBottomRightRadius: 12, paddingStart: 8, justifyContent: "center"}}
                >
                    <Title style={{color: textColor}}>{props.title}</Title>
                </View>
            </View>
        </TouchableOpacity>
    );
}
