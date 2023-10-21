import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { AbstractService } from 'src/common/services/abstract.service';
import { UserCreateDto } from './dto/users.create-dto';
import { UserFilterDto } from './dto/users.filter-dto';
import { UserUpdateDto } from './dto/users.update-dto';
import { User } from './users.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService extends AbstractService<User> {
  constructor(protected repository: UserRepository) {
    super(repository);
  }

  async create(dto: UserCreateDto): Promise<User> {
    return genSalt().then(async (salt: string) => {
      return await this.repository.save({
        ...dto,
        ...{ salt: salt, password: await hash(dto.password, salt) },
      });
    });
  }

  async update(dto: UserUpdateDto, filter: UserFilterDto): Promise<User> {
    return await this.findOne(filter).then(async (user) => {
      if (dto.password !== undefined) {
        dto.password = await hash(dto.password, user.salt);
      }
      return this.repository.save({ ...user, ...dto });
    });
  }
}
