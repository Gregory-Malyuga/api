import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRangeDto } from 'src/common/dto/abstract.range-dto';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/users.create-dto';
import { UserIndexDto } from './dto/users.index-dto';
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

  async findManyAndCount(
    filter: UserIndexDto,
    range: AbstractRangeDto,
  ): Promise<[User[], number]> {
    return await this.repository.findAndCount({
      where: filter,
      skip: range.skip,
      take: range.take,
    });
  }

  // TODO: дописать обработку фильтров чтобы работало с whereIn / JsonContains
  // async processFilter(filter: UserIndexDto): Promise<Object> {
  //   for (let key in filter) {
  //   }
  // }

  async create(dto: UserCreateDto): Promise<User> {
    // TODO заменить на генерацию через jwt service
    // так же нужно хранить не сам пароль а хэшированный пароль
    return await this.repository.save({ ...dto, ...{ salt: 'test' } });
  }

  async update(dto: UserUpdateDto): Promise<User> {
    // Если придет пароль - надо перегенерить соль и захэшировать пароль + соль к себе
    return await this.findOne(dto.id).then((user) =>
      this.repository.save({ ...user, ...dto }),
    );
  }
}
