import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Category } from 'src/categories/category/category';
import { Task } from './task';
import { TaskService } from './task.service';

@Controller('tasks')
export class TasksController {

    constructor(
        private taskService: TaskService
    ) { } 

    @Get()
    async getAll() : Promise<Task[]> {
        return this.taskService.getAll();
    }

    @Get('/id/:id')
    async getById( @Param('id') id: string) : Promise<Task> {
        return this.taskService.getById(id);
    }
	@Get(':category')
	async getByCategory( @Param('category') category: string){
		return this.taskService.getByCategory(category);
	}
	
    @Post()
    async createTask( @Body() task: Task): Promise<Task>{
        return this.taskService.createTask(task);
    }

    @Put('/id/:id')
    async updateTask( @Param('id') id: string, @Body() task: Task): Promise<Task> {
        task.id = id;
        return this.taskService.updateTask(id, task);
    }

    /*@Put(':category')
    async updateTasksByCategory( @Param('category') category: string, @Body() newCategory: Category) {
        return this.taskService.updateTasksByCategory(category, newCategory);
    } */   

    @Delete('/id/:id')
    async deleteTask ( @Param('id') id: string){
        this.taskService.deleteTask(id);
    }
}
