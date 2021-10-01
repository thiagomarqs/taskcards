import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Category } from './category';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {

    constructor(
        private categoryService: CategoryService
    ) { } 

    //OBTER TODAS AS CATEGORIAS
    @Get()
    async getAllCategories() : Promise<Category[]> {
        return this.categoryService.getAllCategories();
    }

    /*
    //OBTER CATEGORIA PELO ID
    @Get('/id/:id')
    async getById( @Param('id') id: string) : Promise<Category> {
        return this.categoryService.getById(id);
    }
    */
   
    //OBTER CATEGORIA PELO NOME
	@Get(':name')
	async getCategoryByName( @Param('name') name: string) {
		return this.categoryService.getCategoryByName(name);
	}
    
    //CRIAR CATEGORIA
    @Post()
    async createCategory( @Body() category: Category): Promise<Category>{
        return this.categoryService.createCategory(category);
    }

    /*
    //ATUALIZAR CATEGORIA PELO ID
    @Put('/id/:id')
    async updateCategory( @Param('id') id: string, @Body() category: Category): Promise<Category> {
        category.id = id;
        return this.categoryService.updateCategory(id, category);
    }
    */

    //ATUALIZAR CATEGORIA PELO NOME
	@Put(':name')
    async updateCategoryByName( @Param('name') name: string, @Body() category: Category): Promise<Category> {
        return this.categoryService.updateCategoryByName(name, category);
    }
    
    /*
    //DELETAR CATEGORIA PELO ID
    @Delete('/id/:id')
    async deleteCategory ( @Param('id') id: string){
        this.categoryService.deleteCategory(id);
    }
    */

    //DELETAR CATEGORIA PELO NOME
    @Delete(':name')
    async deleteCategoryByName ( @Param('name') name: string){
        this.categoryService.deleteCategoryByName(name);
    }

}
