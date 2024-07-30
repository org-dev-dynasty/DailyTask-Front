import React, {useEffect, useState} from 'react';
import { Modal, View, ScrollView } from 'react-native';
import {
    ModalContainer,
    ModalContent,
    Title,
    Subtitle,
    ColorsContainer,
    ColorCircle,
    CustomColorText,
    ConfirmButton,
    ConfirmButtonText,
    CloseButton,
    ColorTitle
} from './styles';
import { Palette, XCircle } from 'phosphor-react-native';
import {Input} from "@/components/input/input";

const categoriesColors = [
    '#ff9494', '#F4966E', '#FFE7A0', '#A4F4C7', '#9CD4F3',
    '#B97CF6', '#F684F2', '#DB6060', '#F98250', '#F2D06A',
    '#52C283', '#5275B7', '#914ED5', '#D55BD0', '#B94646',
    '#D9610A', '#F6C533', '#359860', '#2C357F', '#6420A8', 
    '#AA25A4'
];

export default function CategoryModal({ visible, onClose, onConfirm }: any) {
    const [secondaryColor, setSecondaryColor] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [categoryName, setCategoryName] = useState('');
    const [errorCategoryName, setErrorCategoryName] = useState('');
    const [errorColor, setErrorColor] = useState(false);

    useEffect(() => {
        if (categoryName !== '') {
            setErrorCategoryName('');
        }
        if(secondaryColor !== null){
            setErrorColor(false)
        }
    }, [categoryName, secondaryColor]);

    const confirm = () => {
        if(categoryName === ''){
            setErrorCategoryName('Categoria é obrigatória')
        }
        if(secondaryColor === null){
            setErrorColor(true)
        }
        if(categoryName === '' || secondaryColor === ''){
            return
        }
        setErrorCategoryName(onConfirm(categoryName, selectedColor, secondaryColor))
        setCategoryName('')
        setSecondaryColor(null)
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

    return (
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
                    <CloseButton onPress={onClose}>
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
                                        setSelectedColor(darkenColor(color, 30));
                                    }}
                                />
                            ))}
                        </ColorsContainer>
                    </ScrollView>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                        <CustomColorText>Ou, escolha a sua cor</CustomColorText>
                        <View style={{ marginLeft: 8 }}>
                            <Palette size={32} color='#F06B41' />
                        </View>
                    </View>
                    <ConfirmButton onPress={confirm}>
                        <ConfirmButtonText>Confirmar</ConfirmButtonText>
                    </ConfirmButton>
                </ModalContent>
            </ModalContainer>
        </Modal >

    );
};
