import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/common/dto/pagination.dto';
import { In, JsonContains, Repository } from 'typeorm';
import { UserCreateDto } from './dto/users.create-dto';
import { UserFilterDto } from './dto/users.filter-dto';
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

  async findAndCount(
    filter: UserFilterDto,
    pagination: Pagination,
  ): Promise<[User[], number]> {
    return await this.repository.findAndCount({
      where: this.processFilter(filter),
      skip: pagination.offset,
      take: pagination.limit,
    });
  }

  processFilter(filter: UserFilterDto): object {
    const where = {};
    this.repository.metadata.columns.map((column) => {
      if (filter[column.propertyName]) {
        where[column.propertyName] = filter[column.propertyName];
        if (column.type === 'json') {
          filter[column.propertyName] = JsonContains(
            where[column.propertyName],
          );
        } else if (Array.isArray(filter[column.propertyName])) {
          where[column.propertyName] = In(filter[column.propertyName]);
        }
      }
    });
    return where;
  }

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
