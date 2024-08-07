import {View, Dimensions, TouchableOpacity, Animated, PanResponder} from "react-native";
import {Title} from "@/components/categoryCard/styles";
import {CategoryCardProps} from "@/interfaces/CategoryCard";
import {useRef} from "react";
import {TrashSimple} from "phosphor-react-native";

export const CategoryCard = (props: CategoryCardProps) => {
    const { height, width } = Dimensions.get('window');
    const pan = useRef(new Animated.ValueXY()).current;
    const opacity = useRef(new Animated.Value(0)).current;

    const hexToRgb = (hex: string) => {
        hex = hex.replace(/^#/, '');

        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        return { r, g, b };
    };

    const { r, g, b } = hexToRgb(props.color2);

    const textColor = (r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000' : '#fff');

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                // Limite de movimento para a direita
                if (gestureState.dx > 0 && gestureState.dx < width/5) {
                    Animated.event([null, { dx: pan.x }], { useNativeDriver: false })(evt, gestureState);
                    opacity.setValue(gestureState.dx / (width / 5));
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false,
                }).start();
                Animated.spring(opacity,{
                    toValue: 0,
                    useNativeDriver: false
                }).start();
                if(gestureState.dx >= width/5) {
                    props.onDelete!(props.id)
                }
            },
        })
    ).current;

    return (

        <View style={{ justifyContent: "center"}}>
            <Animated.View
                {...panResponder.panHandlers}
                style={{ transform: pan.getTranslateTransform() }}
            >
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
            </Animated.View>
            <Animated.View style={{position: 'absolute', left: "5%", zIndex: -1, opacity: opacity}}>
                <TrashSimple color={"#DF4B4B"} size={height/18}></TrashSimple>
            </Animated.View>
        </View>
    );
}