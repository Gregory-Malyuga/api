import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { User } from '../users.entity';
import { UsersService } from '../users.service';
import { UserCreateDto as CreateDto } from '../dto/users.create-dto';

@Injectable()
export class UserFactory {
  constructor(private readonly service: UsersService) {}

  async create(dto?: CreateDto): Promise<User> {
    return await this.service.create({
      login: faker.string.sample({ min: 3, max: 255 }),
      password: faker.string.sample({ min: 8, max: 255 }),
      ...dto,
    });
  }
}
