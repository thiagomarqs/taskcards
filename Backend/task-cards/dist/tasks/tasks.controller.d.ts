import { Task } from './task';
import { TaskService } from './task.service';
export declare class TasksController {
    private taskService;
    constructor(taskService: TaskService);
    getAll(): Promise<Task[]>;
    getById(id: string): Promise<Task>;
    getByCategory(category: string): Promise<Task[]>;
    createTask(task: Task): Promise<Task>;
    updateTask(id: string, task: Task): Promise<Task>;
    deleteTask(id: string): Promise<void>;
}
