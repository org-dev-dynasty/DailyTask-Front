export class Task {
    task_id: string | null;
    task_name: string;
    task_date: string | null; // format: 'YYYY-MM-DD'
    task_hour: string; // format: '00:00:00'
    task_description: string | null;
    task_local: string | null;
    category_id: string | null;
    task_status: string;
    constructor(
        task_id: string | null,
        task_name: string,
        task_date: string | null, // format: 'YYYY-MM-DD'
        task_hour: string, // format: '00:00:00'
        task_description: string | null,
        task_local: string | null,
        category_id: string | null,
        task_status: string
    ) {
        this.task_id = task_id;
        this.task_name = task_name;
        this.task_date = task_date;
        this.task_hour = task_hour;
        this.task_description = task_description;
        this.task_local = task_local;
        this.category_id = category_id;
        this.task_status = task_status;
    }
}