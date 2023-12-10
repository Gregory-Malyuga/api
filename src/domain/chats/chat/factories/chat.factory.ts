import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Chat } from '../chat.entity';
import { ChatService as Service } from '../chat.service';
import { UserFactory } from 'src/domain/users/factories/users.factory';
import { ChatCreateDto } from '../dto/chat.create-dto';
import { User } from 'src/graphql';

@Injectable()
export class ChatFactory {
  constructor(
    private readonly service: Service,
    private readonly factory: UserFactory,
  ) {}

  async create(dto?: ChatCreateDto, user?: User): Promise<Chat> {
    return await this.service.processCreate(
      {
        name: faker.string.sample({ min: 1, max: 255 }),
        description: faker.string.sample({ min: 1, max: 2000 }),
        ...dto,
      },
      user ?? (await this.factory.create()),
    );
  }
}
