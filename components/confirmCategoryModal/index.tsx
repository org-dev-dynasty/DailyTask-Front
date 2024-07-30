import React from 'react';
import { Modal } from 'react-native';
import {
    ModalContainer,
    ModalContent,
    Title,
    Subtitle,
    ConfirmButton,
    ButtonsView, ButtonTxt, CancelButton
} from './styles';

export default function ConfirmCategoryModal({ visible, onClose, onConfirm}: any) {
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
                    <Title>Nova Categoria</Title>
                    <Subtitle>A categoria digitada não foi encontrada, gostaria de criá-la?</Subtitle>

                    <ButtonsView>
                        <CancelButton onPress={onClose}>
                            <ButtonTxt>Cancelar</ButtonTxt>
                        </CancelButton>
                        <ConfirmButton onPress={onConfirm}>
                            <ButtonTxt>Confirmar</ButtonTxt>
                        </ConfirmButton>

                    </ButtonsView>

                </ModalContent>
            </ModalContainer>
        </Modal >

    );
};