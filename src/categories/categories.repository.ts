import { Category, CategoryDocument } from './schemas/category.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll(): Promise<CreateCategoryDto[]> {
    return this.categoryModel.find().exec();
  }

  async findById(id: string): Promise<CreateCategoryDto> {
    return this.categoryModel.findById(id);
  }
}
