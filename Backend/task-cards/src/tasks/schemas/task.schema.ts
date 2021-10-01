import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    date: String,
    hour: String,
    completed: Boolean, 
})