import * as mongoose from 'mongoose';

export class CreatePostDto {
  title: string;
  text: string;
  imageFile: mongoose.Schema.Types.ObjectId;
  author: mongoose.Schema.Types.ObjectId;
  category: mongoose.Schema.Types.ObjectId;
  tags: string[];
}
