import { Category } from './category';
import { CategoryService } from './category.service';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    getAllCategories(): Promise<Category[]>;
    getCategoryByName(name: string): Promise<Category>;
    createCategory(category: Category): Promise<Category>;
    updateCategoryByName(name: string, category: Category): Promise<Category>;
    deleteCategoryByName(name: string): Promise<void>;
}
