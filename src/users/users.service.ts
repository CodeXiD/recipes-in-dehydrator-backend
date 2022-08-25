import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  public async findOneByPhone(
    phone: string,
    withPassword = false,
  ): Promise<User | undefined> {
    return this.userRepository.findOneByPhone(phone, withPassword);
  }

  public async create(user: CreateUserDto): Promise<User | undefined> {
    return this.userRepository.create(user);
  }
}
