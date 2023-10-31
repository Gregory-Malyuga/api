import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  SetMetadata,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Cache } from 'cache-manager';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) =>
    GqlExecutionContext.create(ctx).getContext().req.user,
);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    return isPublic || this.extractTokenFromHeader(context);
  }

  private async extractTokenFromHeader(context: ExecutionContext) {
    try {
      const gqlContext = GqlExecutionContext.create(context);
      const request = gqlContext.getContext().req;
      const authorization = request.get('Authorization');
      const token = authorization.replace('Bearer ', '');
      const payload: { id: number } = await this.cacheManager.get(token);
      request['user'] = payload.id;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
