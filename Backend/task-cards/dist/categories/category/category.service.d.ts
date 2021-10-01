import { Category } from './category';
import { Model } from 'mongoose';
import { Task } from 'src/tasks/task';
export declare class CategoryService {
    private readonly categoryModel;
    private readonly taskModel;
    constructor(categoryModel: Model<Category>, taskModel: Model<Task>);
    getAllCategories(): Promise<Category[]>;
    getCategoryByName(name: string): Promise<Category>;
    createCategory(category: Category): Promise<Category>;
    updateCategoryByName(name: string, newCategory: Category): Promise<Category>;
    deleteCategoryByName(name: string): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
}
