import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { ChatUser } from '../../user/chat-user.entity';
import { ChatUserFactory } from '../../user/factories/chat-user.factory';
import { MessageCreateDto as CreateDto } from '../dto/message.create-dto';
import { Message as Entity } from '../message.entity';
import { MessageService as Service } from '../message.service';

@Injectable()
export class MessageFactory {
  constructor(
    private readonly service: Service,
    private readonly chatUserFactory: ChatUserFactory,
  ) {}

  async create(dto?: CreateDto, chatUser?: ChatUser): Promise<Entity> {
    return await this.service.create({
      chatUserId: (chatUser ?? (await this.chatUserFactory.create())).id,
      content: faker.string.sample({ min: 50, max: 2000 }),
      ...dto,
    });
  }
}
