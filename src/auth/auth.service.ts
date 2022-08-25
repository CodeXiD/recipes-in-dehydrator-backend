import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(phone: string, password: string) {
    const user = await this.usersService.findOneByPhone(phone, true);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const matchUser = await this.validateUser(user.phone, user.password);

    if (!matchUser) {
      throw new UnauthorizedException();
    }

    const payload = {
      phone: matchUser.phone,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      sub: matchUser.id,
      fullName: matchUser.fullName,
      avatarUrl: matchUser.avatarUrl,
    };

    if (matchUser) {
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  async register(user) {
    const isExistUserWithPhone = !!(await this.usersService.findOneByPhone(
      user.phone,
    ));

    if (isExistUserWithPhone) {
      throw new HttpException(
        'Користувач з таким телефоном вже зареєстрований',
        HttpStatus.FORBIDDEN,
      );
    }

    return this.usersService.create({
      avatarUrl: 'https://image.pngaaa.com/539/2189539-small.png',
      fullName: user.fullName,
      phone: user.phone,
      password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
    });
  }
}
