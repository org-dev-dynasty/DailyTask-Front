export interface ModalProps {
    type: string;
    modalVisible: boolean;
    closeModal: () => void;
    onEmailChange: (newEmail: string) => void;
}