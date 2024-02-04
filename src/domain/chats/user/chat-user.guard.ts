import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AbstractGuard } from 'src/common/guards/abstract.guard';
import { ChatUser, ChatUser as Entity } from './chat-user.entity';
import { ChatUserRepository as Repository } from './chat-user.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { UserRepository } from 'src/domain/users/users.repository';
import { Chat } from '../chat/chat.entity';
import { ChatUserRoles as Roles } from './enum/chat-user.roles';
import { GqlExecutionContext } from '@nestjs/graphql';

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
    const gqlContext = GqlExecutionContext.create(context);
    return await this.repo
      .findOneOrFailWithProcessWhere(gqlContext.getArgs().filter)
      .then(async (model: Entity) => await model.chat)
      .then(async (chat: Chat) => await this.checkPermission(chat));
  }

  checkPermission = async (chat: Chat): Promise<boolean> =>
    await chat.chatUsers
      .then((chatUsers: ChatUser[]) =>
        chatUsers.find(
          (chatUser: ChatUser) => chatUser.userId === this.user.id,
        ),
      )
      .then((chatUser: ChatUser) => chatUser.roleId === Roles.admin);
}
