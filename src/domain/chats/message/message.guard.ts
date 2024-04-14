import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { AbstractGuard } from 'src/common/guards/abstract.guard';
import { UserRepository } from 'src/domain/users/users.repository';
import { ChatUser } from '../user/chat-user.entity';
import { Message as Entity } from './message.entity';
import { MessageRepository as Repository } from './message.repository';

// Гвард запрещающий удалять/обновлять сообщения кроме своих
@Injectable()
export class MessageGuard extends AbstractGuard<Entity> {
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
      .then(async (entity: Entity) => await this.checkPermission(entity));
  }

  checkPermission = async (entity: Entity): Promise<boolean> =>
    await entity.chatUser.then(
      (chatUser: ChatUser) => chatUser.userId === this.user.id,
    );
}
