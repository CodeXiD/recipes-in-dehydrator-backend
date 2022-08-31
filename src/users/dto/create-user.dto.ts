import * as mongoose from 'mongoose';

export class CreateUserDto {
  fullName: string;
  phone: string;
  password: string;
  avatarFile: mongoose.Schema.Types.ObjectId | null;
}
