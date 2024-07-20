export interface SwitchProps {
    themeMode: string; // 'dark' or 'light'
    onValueChange: (value: boolean) => void;
}