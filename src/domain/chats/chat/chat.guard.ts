import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AbstractGuard } from 'src/common/guards/abstract.guard';
import { Chat as Entity } from './chat.entity';
import { ChatRepository as Repository } from './chat.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { UserRepository } from 'src/domain/users/users.repository';

// Гвард запрещающий удалять/обновлять чаты кроме своих
@Injectable()
export class ChatGuard extends AbstractGuard<Entity> {
  constructor(
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
    protected reflector: Reflector,
    protected repoUser: UserRepository,
    protected repo: Repository,
  ) {
    super(cacheManager, reflector, repoUser, repo);
  }

  // TODO: Переписать
  async specialCanActivate(context: ExecutionContext): Promise<boolean> {
    return !!context;
    // const gqlContext = GqlExecutionContext.create(context);
    // return await this.repo
    //   .findOneOrFailWithProcessWhere(gqlContext.getArgs().filter)
    //   .then((model: Entity) => this.user.id === model.chatU);
  }
}
