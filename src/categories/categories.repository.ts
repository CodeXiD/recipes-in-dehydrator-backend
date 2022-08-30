import { Category, CategoryDocument } from './schemas/category.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Post, PostDocument } from '../posts/schemas/posts.schema';
import { User, UserDocument, UserSchema } from '../users/schemas/users.schema';
import { FileDocument, File } from '../file/schemas/file.schema';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(File.name) private fileModel: Model<FileDocument>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findById(id: string): Promise<Category> {
    return this.categoryModel.findById(id);
  }

  async findPostsByCategoryId(id: string) {
    const categoryWithPosts = await this.categoryModel
      .aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: 'posts',
            localField: '_id',
            foreignField: 'category',
            as: 'posts',
          },
        },
      ])
      .then((document) => {
        return document[0];
      });

    await this.userModel.populate(categoryWithPosts['posts'], {
      path: 'author',
    });
    await this.categoryModel.populate(categoryWithPosts['posts'], {
      path: 'category',
    });
    await this.fileModel.populate(categoryWithPosts['posts'], {
      path: 'imageFile',
    });

    const posts = categoryWithPosts.posts.map((postDocument) => {
      return this.postModel.hydrate(postDocument);
    });

    return posts;
  }
}
