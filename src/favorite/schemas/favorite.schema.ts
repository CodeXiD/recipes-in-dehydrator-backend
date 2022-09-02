import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type FavoriteDocument = Favorite & Document;

@Schema()
export class Favorite {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  owner: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  })
  post: string;
}

const FavoriteSchema = SchemaFactory.createForClass(Favorite);

FavoriteSchema.index({ owner: 1, post: 1 }, { unique: true });

FavoriteSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export { FavoriteSchema };
