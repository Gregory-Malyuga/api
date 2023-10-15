import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { AbstractService } from 'common/services/abstract.service';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/users.create-dto';
import { UserFilterDto } from './dto/users.filter-dto';
import { UserUpdateDto } from './dto/users.update-dto';
import { User } from './users.entity';

@Injectable()
export class UsersService extends AbstractService<User> {
  constructor(
    @InjectRepository(User)
    protected repository: Repository<User>,
  ) {
    super(repository);
  }

  async create(dto: UserCreateDto): Promise<User> {
    const salt = await genSalt();
    dto.password = await hash(dto.password, salt);
    return await this.repository.save({ ...dto, ...{ salt: salt } });
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
