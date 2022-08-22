import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  public async findOneByPhone(phone: string): Promise<User | undefined> {
    return this.userRepository.findOneByPhone(phone);
  }
}
