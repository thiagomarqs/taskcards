import { Task } from './task';
import { Model } from 'mongoose';
export declare class TaskService {
    private readonly taskModel;
    constructor(taskModel: Model<Task>);
    getAll(): Promise<Task[]>;
    getById(id: string): Promise<Task>;
    getByCategory(category: string): Promise<Task[]>;
    createTask(task: Task): Promise<Task>;
    updateTask(id: string, task: Task): Promise<Task>;
    deleteTask(id: string): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
}
