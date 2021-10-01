import { Injectable } from '@nestjs/common';
import { Task } from './task';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/categories/category/category';

@Injectable()
export class TaskService {

    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) { }
   
    async getAll(){
        return await this.taskModel.find().exec();
    }

    async getById(id: string){
       return await this.taskModel.findById(id).exec();
    }
	
	async getByCategory(category: string){
		return await this.taskModel.find( {category: category} ).exec()
	}

    async createTask(task: Task){
        const createdTask = new this.taskModel(task);
        return await createdTask.save();
    }

    async updateTask(id: string, task: Task){
        await this.taskModel.updateOne({_id: id}, task).exec()
        return this.getById(id);
    }

    /*async updateTasksByCategory(category: string, newCategory: Category){
        await this.taskModel.updateMany({category: category}, {category: newCategory.name}).exec()
        return this.getByCategory(newCategory.name);
    }*/

    async deleteTask(id: string){
        return await this.taskModel.deleteOne({ _id: id}).exec();
    }
}
