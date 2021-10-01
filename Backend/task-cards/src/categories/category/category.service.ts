import { Injectable } from '@nestjs/common';
import { Category } from './category';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskService } from 'src/tasks/task.service';
import { Task } from 'src/tasks/task';

@Injectable()
export class CategoryService {

    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>,
                @InjectModel('Task') private readonly taskModel: Model<Task>) { }

    //OBTER TODAS AS CATEGORIAS
    async getAllCategories(){
        return await this.categoryModel.find().exec();
    }

    /*
    //OBTER CATEGORIA PELO  ID
    async getById(id: string){
        return await this.categoryModel.findById(id).exec();
     }
     */

    //OBTER CATEGORIA PELO NOME
	async getCategoryByName(name: string){
        return await this.categoryModel.findOne({name : name}).exec();
     }
     
    //CRIAR CATEGORIA
    async createCategory(category: Category){
        const createdCategory = new this.categoryModel(category);
        return await createdCategory.save();
    }
    /*
    //EDITAR NOME CATEGORIA BUSCANDO PELO ID
    async updateCategory(id: string, category: Category){
        await this.categoryModel.updateOne({_id: id}, category).exec()
        return this.getById(id);
    }
    */

    //EDITAR NOME DA CATEGORIA BUSCANDO PELO NOME
    //Primeiro, busca as tarefas da categoria informada e substitui a categoria dessas tarefas pelo novo nome
    //Por fim, altera o nome da categoria informada pelo novo nome
	async updateCategoryByName(name: string, newCategory: Category){
        await this.taskModel.updateMany({category: name}, {category: newCategory.name}).exec()
        await this.categoryModel.updateOne({name: name}, {name: newCategory.name}).exec()
        return this.getCategoryByName(newCategory.name);
    }

    /*
    //DELETAR CATEGORIA BUSCANDO PELO ID
    async deleteCategory(id: string){
        return await this.categoryModel.deleteOne({ _id: id}).exec();
    }
    */
   
    //DELETAR CATEGORIA BUSCANDO PELO NOME
    //Primeiro seta o atributo 'category' de todas as tarefas associadas a essa categoria para "" 
    //Por fim, deleta a categoria
    async deleteCategoryByName(name: string){
        await this.taskModel.updateMany({category: name}, {category: ""}).exec()
        return await this.categoryModel.deleteOne({name: name}).exec();
    }
}
