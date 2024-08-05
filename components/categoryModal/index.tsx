import React, {useEffect, useState} from 'react';
import {Modal, View, TouchableOpacity, ScrollView, Alert} from 'react-native';
import ColorPicker, { Panel3, Preview, BrightnessSlider } from 'reanimated-color-picker';
import {
    ModalContainer,
    ModalContent,
    Title,
    Subtitle,
    ColorsContainer,
    ColorCircle,
    CustomColorText,
    ConfirmButton,
    CloseButton,
    ColorTitle, ButtonTxt, ButtonsView, CancelButton, ConfirmButtonRow, PickerColorCircle
} from './styles';
import { Palette, XCircle } from 'phosphor-react-native';
import {Input} from "@/components/input/input";
import {CategoryCard} from "@/components/categoryCard";

const categoriesColors = [
    '#FF9494', '#F4966E', '#FFE7A0', '#A4F4C7', '#9CD4F3',
    '#B97CF6', '#F684F2', '#DB6060', '#F98250', '#F2D06A',
    '#52C283', '#5275B7', '#914ED5', '#D55BD0', '#B94646',
    '#D9610A', '#F6C533', '#359860', '#2C357F', '#6420A8',
    '#AA25A4'
];

export default function CategoryModal({ visible, onClose, onConfirm }: any) {
    const [primaryColor, setPrimaryColor] = useState<string>('');
    const [categoryName, setCategoryName] = useState<string>('');
    const [secondaryColor, setSecondaryColor] = useState<string>('');
    const [errorCategoryName, setErrorCategoryName] = useState('');
    const [errorColor, setErrorColor] = useState(false);

    const [colorPickerVisible, setColorPickerVisible] = useState(false);
    const [pickerPrimaryColor, setPickerPrimaryColor] = useState('#B03D18');
    const [pickerSecondaryColor, setPickerSecondaryColor] = useState('#F06B41');

    useEffect(() => {
        if (categoryName !== '') {
            setErrorCategoryName('');
        }
        if(secondaryColor !== null){
            setErrorColor(false)
        }
    }, [categoryName, secondaryColor]);

    const confirm = () => {
        if(categoryName === '' && secondaryColor === ''){
            setErrorCategoryName('Categoria é obrigatória')
            setErrorColor(true)
            return
        }
        if(categoryName === ''){
            setErrorCategoryName('Categoria é obrigatória')
            return
        }
        if(secondaryColor === ''){
            setErrorColor(true)
            return
        }
        if(onConfirm(categoryName, primaryColor, secondaryColor)){
            setCategoryName('')
            setSecondaryColor('')
            setPrimaryColor('')
        }
        else {
            Alert.alert('Erro ao criar categoria', 'Ocorreu um erro ao tentar criar a categoria. Por favor tente novamente mais tarde');
        }
    }

    const darkenColor = (color: string, amount: number): string => {
        let colorWithoutHash = color.replace(/^#/, '');
        if (colorWithoutHash.length === 3) {
            colorWithoutHash = colorWithoutHash.split('').map(char => char + char).join('');
        }
        const num = parseInt(colorWithoutHash, 16);
        let r = (num >> 16) - amount;
        let g = ((num >> 8) & 0x00FF) - amount;
        let b = (num & 0x0000FF) - amount;

        r = r < 0 ? 0 : r;
        g = g < 0 ? 0 : g;
        b = b < 0 ? 0 : b;

        return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
    }

    const handlePickerButtonPress = () => {
        setColorPickerVisible(false)
        setPickerPrimaryColor('#B03D18')
        setPickerSecondaryColor('#F06B41')
        setPrimaryColor('')
        setSecondaryColor('')
    }

    const handlePickerConfirm = () => {
        setPrimaryColor(pickerPrimaryColor)
        setSecondaryColor(pickerSecondaryColor)
        setColorPickerVisible(false)
    };

    const handleClose = () => {
        onClose()
        setPickerPrimaryColor('#B03D18')
        setPickerSecondaryColor('#F06B41')
        setPrimaryColor('')
        setSecondaryColor('')
        setCategoryName('')
    }

    return (
        <>
            <Modal
                transparent
                visible={visible}
                animationType="slide"
                onRequestClose={onClose}
            >
                <ModalContainer>
                    <ModalContent
                        colors={['#3C0B50', '#2E083D', '#0F0413']}
                        locations={[0, 0.28, 1]}
                    >
                        <CloseButton onPress={handleClose}>
                            <XCircle size={32} color='#F06B41' />
                        </CloseButton>
                        <Title>Criar Categoria</Title>
                        <Subtitle>Crie uma nova categoria para as suas tasks</Subtitle>

                        <View style={{width: '90%'}}>
                            <Input
                                placeholder="Digite aqui..."
                                label={'Nome da categoria'}
                                value={categoryName}
                                onChangeText={setCategoryName}
                                error={errorCategoryName}
                            />
                        </View>

                        <ScrollView style={{borderWidth: 2, borderColor: errorColor ? "#DE4343" : 'transparent', borderRadius: 5, marginTop: 5}}>
                            <ColorTitle>Selecione uma cor</ColorTitle>
                            <ColorsContainer>
                                {categoriesColors.map(color => (
                                    <ColorCircle
                                        key={color}
                                        color={color}
                                        selected={secondaryColor === color}
                                        onPress={() => {
                                            setSecondaryColor(color);
                                            setPrimaryColor(darkenColor(color, 30));
                                        }}
                                    />
                                ))}
                            </ColorsContainer>
                        </ScrollView>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <CustomColorText>Ou, escolha a sua cor</CustomColorText>
                            <TouchableOpacity style={{ marginLeft: 8 }} onPress={() => setColorPickerVisible(true)}>
                                <Palette size={32} color='#F06B41' style={{}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{height: 32, flexDirection: 'row', marginBottom: 5, opacity: 1, gap: 8, width: "100%", justifyContent: 'center'}}>
                            <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
                                <CustomColorText>
                                    Cor primária:
                                </CustomColorText>
                                <PickerColorCircle
                                    color={primaryColor == '' ? 'transparent' : primaryColor}
                                    onPress={() => {setColorPickerVisible(true)}}
                                />
                            </View>
                            <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
                                <CustomColorText>
                                    Cor secundária:
                                </CustomColorText>
                                <PickerColorCircle
                                    color={secondaryColor == '' ? 'transparent' : secondaryColor == null ? primaryColor : secondaryColor}
                                    onPress={() => {setColorPickerVisible(true)}}
                                />
                            </View>
                        </View>
                        <ConfirmButton onPress={confirm}>
                            <ButtonTxt>Confirmar</ButtonTxt>
                        </ConfirmButton>
                    </ModalContent>
                </ModalContainer>
            </Modal >
            <Modal transparent visible={colorPickerVisible} animationType='slide'>
                <ModalContainer>
                    <ModalContent
                        colors={['#3C0B50', '#2E083D', '#0F0413']}
                        locations={[0, 0.28, 1]}
                    >
                        <CategoryCard id={""} title={categoryName ? categoryName : "Categoria"} color={pickerPrimaryColor} color2={pickerSecondaryColor}></CategoryCard>
                        <View style={{flexDirection: 'row', marginVertical: 15}}>
                            <ColorPicker style={{ width: '50%', paddingHorizontal: 30 }} value={pickerPrimaryColor} onComplete={({ hex }: any) => {setPickerPrimaryColor(hex)}}>
                                <Preview style={{marginBottom:10}} hideInitialColor/>
                                <Panel3 />
                                <BrightnessSlider style={{marginTop:10}}/>
                            </ColorPicker>
                            <ColorPicker style={{ width: '50%', paddingHorizontal: 30 }} value={pickerSecondaryColor} onComplete={({ hex }: any) => {setPickerSecondaryColor(hex)}}>
                                <Preview style={{marginBottom:10}} hideInitialColor/>
                                <Panel3 />
                                <BrightnessSlider style={{marginTop:10}}/>
                            </ColorPicker>
                        </View>

                        <ButtonsView>
                            <CancelButton onPress={handlePickerButtonPress}>
                                <ButtonTxt>Cancelar</ButtonTxt>
                            </CancelButton>
                            <ConfirmButtonRow onPress={handlePickerConfirm}>
                                <ButtonTxt>Confirmar</ButtonTxt>
                            </ConfirmButtonRow>

                        </ButtonsView>
                    </ModalContent>
                </ModalContainer>
            </Modal>
        </>
    );
};