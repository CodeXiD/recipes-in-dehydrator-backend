import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { User } from '../../users/schemas/users.schema';

export type FileDocument = File & Document;

@Schema()
export class File {
  @Prop({ required: true })
  originalName: string;

  @Prop({ required: true })
  encoding: string;

  @Prop({ required: true })
  mimeType: string;

  @Prop({ required: true })
  destination: string;

  @Prop({ required: true })
  fileName: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  size: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  owner: User;
}

const FileSchema = SchemaFactory.createForClass(File);

FileSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

FileSchema.virtual('downloadUrl').get(function () {
  return `${process.env.BACKEND_URL}/file/${this.id}`;
});

export { FileSchema };
