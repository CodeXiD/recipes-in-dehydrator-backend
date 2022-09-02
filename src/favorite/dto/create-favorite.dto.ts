import { IsMongoId } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateFavoriteDto {
  @IsMongoId()
  owner: mongoose.Schema.Types.ObjectId;

  @IsMongoId()
  post: mongoose.Schema.Types.ObjectId;
}
