import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FileModule } from './file/file.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    CategoriesModule,
    PostsModule,
    AuthModule,
    UsersModule,
    FileModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
