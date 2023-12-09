import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Inject,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { User } from '../users/users.entity';
import { UserRepository } from '../users/users.repository';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return GqlExecutionContext.create(ctx).getContext().req.user;
  },
);

@Injectable()
export class AuthGuard implements CanActivate {
  protected user: User;

  constructor(
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
    protected reflector: Reflector,
    protected repoUser: UserRepository,
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
    return !!context;
  }

  private async extractTokenFromHeader(context: ExecutionContext) {
    try {
      const gqlContext = GqlExecutionContext.create(context);
      const request = gqlContext.getContext().req;
      const authorization: string = request.get('Authorization');
      const token = authorization.replace('Bearer ', '');
      const payload: { id: number } = await this.cacheManager.get(token);
      this.user = await this.repoUser.findOneBy({
        id: payload.id,
      });
      request['user'] = this.user;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
