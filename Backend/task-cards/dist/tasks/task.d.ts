import { Document } from 'mongoose';
export declare class Task extends Document {
    title: string;
    description: string;
    category: string;
    date: string;
    hour: string;
    completed: boolean;
}
