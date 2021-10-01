import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './categories/category/category.module'


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://user321:Dr6sxRc23M2e7QBv@clusterteste.wpmac.mongodb.net/taskcards?retryWrites=true&w=majority'),
    TasksModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
