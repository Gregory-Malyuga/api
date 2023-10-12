import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/users.create-dto';
import { UserUpdateDto } from './dto/users.update-dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    return await this.repository.findOneOrFail({ where: { id: id } });
  }

  async findManyAndCount(): Promise<[User[], number]> {
    return await this.repository.findAndCount();
  }

  async create(dto: UserCreateDto): Promise<User> {
    // TODO заменить на генерацию через jwt service
    // так же нужно хранить не сам пароль а хэшированный пароль
    //
    return await this.repository.save({ ...dto, ...{ salt: 'test' } });
  }

  async update(dto: UserUpdateDto): Promise<User> {
    // Если придет пароль - надо перегенерить соль и захэшировать пароль + соль к себе
    return await this.findOne(dto.id).then((user) =>
      this.repository.save({ ...user, ...dto }),
    );
  }
}
