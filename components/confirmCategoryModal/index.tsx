import React from 'react';
import { Modal } from 'react-native';
import {
    ModalContainer,
    ModalContent,
    Title,
    Subtitle,
    ConfirmButton,
    ButtonsView, ButtonTxt, CancelButton
} from '@/components/confirmCategoryModal/styles';

export default function ConfirmCategoryModal({ visible, onClose, onConfirm, title, subtitle}: any) {
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
                    <Title>{title}</Title>
                    <Subtitle>{subtitle}</Subtitle>

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