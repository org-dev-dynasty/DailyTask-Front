export interface TaskInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    placeholder?: string;
    style?: object;
    category?: () => void;
    time?: boolean;
    date?: boolean;
    description?: boolean;
    maxLength?: number;
}