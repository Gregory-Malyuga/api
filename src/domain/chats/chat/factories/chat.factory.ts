import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Chat } from '../chat.entity';
import { ChatService as Service } from '../chat.service';
import { UserFactory } from 'src/domain/users/factories/users.factory';

@Injectable()
export class ChatFactory {
  constructor(
    private readonly service: Service,
    private readonly factory: UserFactory,
  ) {}

  async create(dto?: object): Promise<Chat> {
    const user = await this.factory.create();
    return await this.service.create({
      name: faker.string.sample({ min: 1, max: 255 }),
      description: faker.string.sample({ min: 1, max: 2000 }),
      ownerId: user.id,
      ...dto,
    });
  }
}
