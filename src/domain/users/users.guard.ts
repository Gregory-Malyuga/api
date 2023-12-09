import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from 'src/domain/auth/auth.guards';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from './users.entity';

// Гвард запрещающий удалять/обновлять пользователей кроме своего
@Injectable()
export class UserGuard extends AuthGuard {
  async specialCanActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    return await this.repoUser
      .findOneBy(gqlContext.getArgs().filter)
      .then((user: User) => this.user.id === user.id);
  }
}
