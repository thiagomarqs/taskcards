import { Category } from './category';
import { Model } from 'mongoose';
export declare class CategoryService {
    private readonly categoryModel;
    constructor(categoryModel: Model<Category>);
    getAllCategories(): Promise<Category[]>;
    createCategory(category: Category): Promise<Category>;
}
