import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { FileRepository } from './file.repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

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

  async remove(id: string) {
    const foundFile = await this.fileRepository.findById(id);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (foundFile.owner.toString() !== this.request.user.userId) {
      throw new UnauthorizedException();
    }

    return this.fileRepository.removeById(id);
  }
}
