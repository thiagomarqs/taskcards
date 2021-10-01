import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TasksController } from './tasks.controller';
import { TaskSchema } from './schemas/task.schema';
import { Mongoose } from 'mongoose';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])
    ],
    controllers: [TasksController],
    providers: [TaskService]
})
export class TasksModule {}
