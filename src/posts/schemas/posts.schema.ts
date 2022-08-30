import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category } from '../../categories/schemas/category.schema';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/users.schema';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    required: true,
  })
  imageFile: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  author: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Category;

  @Prop({ required: true })
  tags: string[];
}

const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export { PostSchema };
