import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/posts.schema';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel
      .find()
      .populate('category')
      .populate('author')
      .populate('imageFile')
      .exec();
  }

  async findById(id: string): Promise<Post> {
    return this.postModel
      .findById(id)
      .populate('category')
      .populate('author')
      .populate('imageFile');
  }
}
