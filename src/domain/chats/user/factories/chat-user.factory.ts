import { Injectable } from '@nestjs/common';
import { ChatUser } from '../chat-user.entity';
import { ChatUserService as Service } from '../chat-user.service';
import { ChatFactory } from '../../chat/factories/chat.factory';
import { ChatUserCreateDto as CreateDto } from '../dto/chat-user.create-dto';

@Injectable()
export class ChatUserFactory {
  constructor(
    private readonly chatFactory: ChatFactory,
    private readonly service: Service,
  ) {}

  async create(dto?: CreateDto): Promise<ChatUser> {
    const chat = await this.chatFactory.create();
    return await this.service.create({
      ...{ chatId: chat.id, userId: chat.id, roleId: 1 },
      ...dto,
    });
  }
}
