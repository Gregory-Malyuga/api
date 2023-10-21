import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UsersResolver } from '../users/users.module';

@Injectable()
export class AuthService {
  constructor(
    private usersResolver: UsersResolver,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    console.log(process.env.JWT_SECRET);
    const user = await this.usersResolver.findOne({
      username: username,
    });
    if (!compare(user.password, await hash(password, user.salt))) {
      throw new UnauthorizedException();
    }
    const token = await this.jwtService.signAsync({
      sub: user.id,
      username: user.username,
    });
    return {
      access_token: token,
    };
  }
}
