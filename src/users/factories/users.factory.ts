import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { User } from '../users.entity';
import { UsersService } from '../users.service';

@Injectable()
export class UserFactory {
  constructor(private readonly service: UsersService) {}

  async create(dto?: object): Promise<User> {
    return await this.service.create({
      login: faker.string.sample({ min: 1, max: 255 }),
      password: faker.string.sample({ min: 1, max: 255 }),
      ...dto,
    });
  }
}
