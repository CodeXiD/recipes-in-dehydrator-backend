import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  StreamableFile,
  Request,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  @UseInterceptors(FileInterceptor('file', { dest: './storage' }))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
    return this.fileService.create({
      originalName: file.originalname,
      encoding: file.encoding,
      mimeType: file.mimetype,
      destination: file.destination,
      fileName: file.filename,
      path: file.path,
      size: file.size,
      owner: req.user.userId,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StreamableFile> {
    const foundFile = await this.fileService.findOne(id);

    const file = createReadStream(join(process.cwd(), foundFile.path));
    return new StreamableFile(file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.fileService.remove(id);
  }
}
