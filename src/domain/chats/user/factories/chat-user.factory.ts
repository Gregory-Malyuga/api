import { Injectable } from '@nestjs/common';
import { UserFactory } from 'src/domain/users/factories/users.factory';
import { ChatUser } from '../chat-user.entity';
import { ChatUserService } from '../chat-user.service';
import { ChatFactory } from '../../chat/factories/chat.factory';

@Injectable()
export class ChatUserFactory {
  constructor(
    private readonly userFactory: UserFactory,
    private readonly chatFactory: ChatFactory,
    private readonly service: ChatUserService,
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
