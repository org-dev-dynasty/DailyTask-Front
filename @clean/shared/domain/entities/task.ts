export class Task {
    constructor(
        task_id: string | null,
        task_name: string,
        task_date: Date, // format: 'YYYY-MM-DD'
        task_hour: string, // format: '00:00:00'
        task_description: string | null,
        task_local: string | null,
        task_status: string
    ) {}
}