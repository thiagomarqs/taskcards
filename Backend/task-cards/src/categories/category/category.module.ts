import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategorySchema } from './schemas/category.schema';
import { Mongoose } from 'mongoose';
import { TasksModule } from 'src/tasks/tasks.module';
import { TaskSchema } from 'src/tasks/schemas/task.schema';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
        MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
        TasksModule
    ],
    controllers: [CategoryController],
    providers: [CategoryService]
})
export class CategoryModule {}
