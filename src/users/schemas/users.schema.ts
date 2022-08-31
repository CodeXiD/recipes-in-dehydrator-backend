import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category } from '../../categories/schemas/category.schema';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    default: null,
  })
  avatarFile: mongoose.Schema.Types.ObjectId;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export { UserSchema };
