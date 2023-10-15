import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/services/abstract.service';
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
    // TODO заменить на генерацию через jwt service

    // так же нужно хранить не сам пароль а хэшированный пароль
    return await this.repository.save({ ...dto, ...{ salt: 'test' } });
  }

  async update(dto: UserUpdateDto, filter: UserFilterDto): Promise<User> {
    // Если придет пароль - надо перегенерить соль и захэшировать пароль + соль к себе
    return await this.findOne(filter).then((user) =>
      this.repository.save({ ...user, ...dto }),
    );
  }
}
