export interface TaskModalProps {
    onClose: () => void;
    confirm: boolean;
    taskId?: string;
    taskName?: string;
    taskDescription?: string;
    taskDate?: string;
    taskTime?: string;
    taskLocal?: string;
}