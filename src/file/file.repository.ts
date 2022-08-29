import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileDocument, File } from './schemas/file.schema';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileRepository {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async create(createFileDto: CreateFileDto): Promise<File> {
    const createdFile = new this.fileModel(createFileDto);
    return createdFile.save();
  }

  async findById(id: string): Promise<File> {
    return this.fileModel.findById(id);
  }
}
