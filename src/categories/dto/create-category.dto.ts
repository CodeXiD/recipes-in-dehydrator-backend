import { IsMongoId, IsString } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateCategoryDto {
  @IsString()
  readonly name: string;

  @IsMongoId()
  imageFile: mongoose.Schema.Types.ObjectId;
}
