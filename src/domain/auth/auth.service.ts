import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { Cache } from 'cache-manager';
import { UsersResolver } from '../users/users.module';

@Injectable()
export class AuthService {
  constructor(
    private usersResolver: UsersResolver,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async signIn(login: string, password: string): Promise<any> {
    const user = await this.usersResolver.findOne({
      login: login,
    });
    if (!compare(user.password, await hash(password, user.salt))) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: user.id,
    };
    const token = await this.jwtService.signAsync(payload);
    await this.cacheManager.set(token, payload, 86400000);
    return {
      access_token: token,
    };
  }
}
