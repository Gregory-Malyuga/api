import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
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

  async specialCanActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    return await this.repo
      .findOneOrFailWithProcessWhere(gqlContext.getArgs().filter)
      .then((model: Entity) => this.user.id === model.creatorId);
  }
}
