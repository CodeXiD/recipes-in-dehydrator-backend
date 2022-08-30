import * as mongoose from 'mongoose';

export class CreateFileDto {
  originalName: string;
  encoding: string;
  mimeType: string;
  destination: string;
  fileName: string;
  path: string;
  size: number;
  owner: mongoose.Schema.Types.ObjectId;
}
