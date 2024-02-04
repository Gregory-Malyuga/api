import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AbstractGuard } from 'src/common/guards/abstract.guard';
import { Chat as Entity } from './chat.entity';
import { ChatRepository as Repository } from './chat.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { UserRepository } from 'src/domain/users/users.repository';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ChatUser } from '../user/chat-user.entity';
import { ChatUserRoles as Roles } from '../user/enum/chat-user.roles';

// Гвард запрещающий удалять/обновлять чаты кроме тех где юзер админ
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
      .then(async (entity: Entity) => await this.checkPermission(entity));
  }

  checkPermission = async (entity: Entity): Promise<boolean> =>
    await entity.chatUsers
      .then((chatUsers: ChatUser[]) =>
        chatUsers.find(
          (chatUser: ChatUser) => chatUser.userId === this.user.id,
        ),
      )
      .then((chatUser: ChatUser) => chatUser.roleId === Roles.admin);
}
