import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ MongooseModule.forRoot("mongodb+srv://mumekonin:347548@cluster0.d3ahpuk.mongodb.net/register?retryWrites=true&w=majority"),userModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
