import { Injectable } from '@nestjs/common';
import { ChatUser } from '../chat-user.entity';
import { ChatUserService as Service } from '../chat-user.service';
import { UserFactory } from 'src/domain/users/factories/users.factory';
import { ChatFactory } from '../../chat/factories/chat.factory';

@Injectable()
export class ChatUserFactory {
  constructor(
    private readonly userFactory: UserFactory,
    private readonly chatFactory: ChatFactory,
    private readonly service: Service,
  ) {}

  async create(dto?: object): Promise<ChatUser> {
    const chat = await this.chatFactory.create();
    const user = await this.userFactory.create();
    return await this.service.create({
      ...{ chatId: chat.id, userId: user.id },
      ...dto,
    });
  }
}
