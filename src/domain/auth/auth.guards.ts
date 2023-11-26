import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  protected user: User;

  constructor(
    protected userService: UsersService,
    protected reflector: Reflector,
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    return (
      isPublic ||
      ((await this.extractTokenFromHeader(context)) &&
        (await this.specialCanActivate(context)))
    );
  }

  async specialCanActivate(context: ExecutionContext): Promise<boolean> {
    return true;
  }

  private async extractTokenFromHeader(context: ExecutionContext) {
    try {
      const gqlContext = GqlExecutionContext.create(context);
      const request = gqlContext.getContext().req;
      const authorization = request.get('Authorization');
      const token = authorization.replace('Bearer ', '');
      const payload: { id: number } = await this.cacheManager.get(token);
      this.user = await this.userService.findOne({
        id: payload.id,
      });
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
