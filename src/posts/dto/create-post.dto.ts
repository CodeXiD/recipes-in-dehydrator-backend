import * as mongoose from 'mongoose';

export class CreatePostDto {
  title: string;
  text: string;
  imageUrl: string;
  author: string;
  category: mongoose.Schema.Types.ObjectId;
}
