import { Category } from './category';
import { CategoryService } from './category.service';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    createCategory(category: Category): Promise<Category>;
    getAll(): Promise<Category[]>;
}
