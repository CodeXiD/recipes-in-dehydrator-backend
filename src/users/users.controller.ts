import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FavoriteRepository } from '../favorite/favorite.repository';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private favoriteRepository: FavoriteRepository,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async updateProfile(@Request() req, @Body() body) {
    return this.usersService.update(req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  async getUserFavorites(@Request() req) {
    return this.favoriteRepository.findByOwner(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('favorites')
  async addUserFavorite(@Request() req, @Body() body) {
    return this.favoriteRepository.create({
      post: body.postId,
      owner: req.user.userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('favorites/:id')
  async removeUserFavorite(@Request() req, @Param('id') id: string) {
    const favorite = await this.favoriteRepository.findById(id);

    if (!favorite) {
      throw new NotFoundException('Запис не знайдено');
    }

    if (favorite.owner.id !== req.user.userId) {
      throw new BadRequestException('Ви не є власником запису');
    }

    return this.favoriteRepository.removeById(id);
  }
}
