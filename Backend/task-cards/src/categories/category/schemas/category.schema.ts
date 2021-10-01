import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    name: String,
})