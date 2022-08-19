import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostsRepository) {}

  public async create(createPostDto: CreatePostDto) {
    return this.postRepository.create(createPostDto);
  }

  public async findAll() {
    return this.postRepository.findAll();
  }

  public async findOne(id: string) {
    const foundPost = await this.postRepository.findById(id);

    if (!foundPost) {
      throw new NotFoundException('Пост не знайдено');
    }

    return foundPost;
  }
}
