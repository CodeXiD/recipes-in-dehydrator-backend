import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async findAll() {
    return this.categoryRepository.findAll();
  }

  public async findPostsByCategoryId(id: string) {
    return this.categoryRepository.findPostsByCategoryId(id);
  }

  public async findOne(id: string) {
    const foundCategory = await this.categoryRepository.findById(id);

    if (!foundCategory) {
      throw new NotFoundException('Категорія не знайдена');
    }

    return foundCategory;
  }
}
