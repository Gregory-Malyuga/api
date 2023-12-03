import { Inject, Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { AbstractService } from 'src/common/services/abstract.service';
import { UserCreateDto } from './dto/users.create-dto';
import { UserFilterDto } from './dto/users.filter-dto';
import { UserUpdateDto } from './dto/users.update-dto';
import { User } from './users.entity';
import { UserRepository } from './users.repository';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import { AbstractFilterDto } from '../../common/dto/abstract.filter-dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UsersService extends AbstractService<User> {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
    protected repository: UserRepository,
  ) {
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
        await this.cacheClear(user);
      }
      return this.repository.save({ ...user, ...dto });
    });
  }

  async delete(filter: AbstractFilterDto): Promise<boolean> {
    return await this.findOne(filter)
      .then((model) => this.repository.softRemove(model))
      .then((model: User) => this.cacheClear(model))
      .then(() => true);
  }

  // TODO: тут проблема - cache manager по какой-то причине тянется не из auth а создается новый,
  //  в связи с этим выкинуть пользователя неполучается
  private async cacheClear(user: User) {
    await this.jwtService
      .signAsync({
        id: user.id,
      })
      .then((token) => this.cacheManager.del(token));
  }
}
