import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { ChatService } from '../chat.service';
import { Chat } from '../chat.entity';

@Injectable()
export class ChatFactory {
  constructor(private readonly service: ChatService) {}

  async create(dto?: object): Promise<Chat> {
    return await this.service.create({
      name: faker.string.sample({ min: 1, max: 255 }),
      description: faker.string.sample({ min: 1, max: 2000 }),
      ...dto,
    });
  }
}
