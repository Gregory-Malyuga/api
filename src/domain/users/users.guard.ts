import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from 'src/domain/auth/auth.guards';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from './users.entity';

// Гвард запрещающий удалять/обновлять пользователей кроме своего
@Injectable()
export class UserGuard extends AuthGuard {
  async specialCanActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const filter = gqlContext.getArgs().filter;
    return await this.userService
      .findOne(filter)
      .then((user: User) => user.id === user.id);
  }
}
