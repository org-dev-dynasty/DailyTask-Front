import { Task } from "../entities/task";

type Dot = {
    key: string;
    color: string;
};

type TaskGroup = {
    [date: string]: Task[];
};

type DotsGroup = {
    [date: string]: {
        dots: Dot[];
    };
};

export type GetAllTasksResponse = {
    message: string;
    tasks: TaskGroup;
    dots: DotsGroup;
    CurrentDay: string;
};
