export interface CategoryCardProps {
    id: string;
    title: string;
    color: string;
    color2: string;
    close?: () => void;
    onDelete?: (id: string) => void;
    setCategory?: void;
}