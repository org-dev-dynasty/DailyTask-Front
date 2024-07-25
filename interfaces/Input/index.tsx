export interface InputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    error: string;
    placeholder?: string;
    hide?: boolean;
}