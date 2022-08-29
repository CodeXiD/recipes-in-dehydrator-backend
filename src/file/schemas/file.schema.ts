import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

const FileSchema = SchemaFactory.createForClass(File);

FileSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export { FileSchema };
