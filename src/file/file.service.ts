import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  public async create(createFileDto: CreateFileDto) {
    return this.fileRepository.create(createFileDto);
  }

  public async findOne(id: string) {
    const foundFile = await this.fileRepository.findById(id);

    if (!foundFile) {
      throw new NotFoundException('Файл не знайдено');
    }

    return foundFile;
  }

  remove(id: string) {
    return `This action removes a #${id} file`;
  }
}
