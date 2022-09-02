import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Favorite, FavoriteDocument } from './schemas/favorite.schema';
import * as mongoose from 'mongoose';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoriteRepository {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
  ) {}

  async findByOwner(
    ownerId: mongoose.Schema.Types.ObjectId,
  ): Promise<Favorite[]> {
    return this.favoriteModel
      .find({ owner: ownerId })
      .populate('owner')
      .populate('post')
      .exec();
  }

  async findById(id: string): Promise<any> {
    return this.favoriteModel.findById(id).populate('owner').populate('post');
  }

  async create(createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    return this.favoriteModel.create(createFavoriteDto);
  }

  async removeById(id: string): Promise<Favorite> {
    return this.favoriteModel.findByIdAndDelete(id);
  }
}
