import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AbstractGuard } from 'src/common/guards/abstract.guard';
import { ChatUser as Entity } from './chat-user.entity';
import { ChatUserRepository as Repository } from './chat-user.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { UserRepository } from 'src/domain/users/users.repository';

// Гвард разрешающий инвайтить только владельцу
@Injectable()
export class ChatUserGuard extends AbstractGuard<Entity> {
  constructor(
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
    protected reflector: Reflector,
    protected repoUser: UserRepository,
    protected repo: Repository,
  ) {
    super(cacheManager, reflector, repoUser, repo);
  }

  async specialCanActivate(context: ExecutionContext): Promise<boolean> {
    return !!context;
    // const gqlContext = GqlExecutionContext.create(context);
    // return await this.repo
    //   .findOneOrFailWithProcessWhere(gqlContext.getArgs().filter)
    //   .then((model: Entity) => this.user.id === model.chat.owner.id);
  }
}
