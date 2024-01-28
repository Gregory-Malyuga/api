import { Injectable } from '@nestjs/common';
import { ChatFactory } from 'src/domain/chats/chat/factories/chat.factory';
import { ChatUser } from 'src/domain/chats/user/chat-user.entity';
import { ChatUserService as Service } from 'src/domain/chats/user/chat-user.service';
import { ChatUserCreateDto as CreateDto } from 'src/domain/chats/user/dto/chat-user.create-dto';
import { ChatUserRoles as Roles } from 'src/domain/chats/user/enum/chat-user.roles';
import { UserFactory } from 'src/domain/users/factories/users.factory';

@Injectable()
export class ChatUserFactory {
  constructor(
    private readonly chatFactory: ChatFactory,
    private readonly userFactory: UserFactory,
    private readonly service: Service,
  ) {}

  async create(dto?: CreateDto): Promise<ChatUser> {
    const chat = await this.chatFactory.create();
    const user = await this.userFactory.create();
    return await this.service.create({
      ...{
        chatId: chat.id,
        userId: user.id,
        roleId: Roles.member,
      },
      ...dto,
    });
  }
}
