import { Inject, Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { AbstractService } from 'src/common/services/abstract.service';
import { UserCreateDto as CreateDto } from './dto/users.create-dto';
import { UserFilterDto as FilterDto } from './dto/users.filter-dto';
import { UserUpdateDto as UpdateDto } from './dto/users.update-dto';
import { User as Entity } from './users.entity';
import { UserRepository as Repository } from './users.repository';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import { AbstractFilterDto } from '../../common/dto/abstract.filter-dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UsersService extends AbstractService<Entity> {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
    protected repository: Repository,
  ) {
    super(repository);
  }

  async create(dto: CreateDto): Promise<Entity> {
    return genSalt().then(async (salt: string) => {
      return await this.repository.save({
        ...dto,
        ...{ salt: salt, password: await hash(dto.password, salt) },
      });
    });
  }

  async update(dto: UpdateDto, filter: FilterDto): Promise<Entity> {
    return await this.findOne(filter).then(async (model) => {
      if (dto.password !== undefined) {
        dto.password = await hash(dto.password, model.salt);
        await this.cacheClear(model);
      }
      return this.repository.save({ ...model, ...dto });
    });
  }

  async delete(filter: AbstractFilterDto): Promise<boolean> {
    return await this.findOne(filter)
      .then((model) => this.repository.softRemove(model))
      .then((model: Entity) => this.cacheClear(model))
      .then(() => true);
  }

  // TODO: тут проблема - cache manager по какой-то причине тянется не из auth а создается новый,
  //  в связи с этим выкинуть пользователя неполучается
  private async cacheClear(model: Entity) {
    await this.jwtService
      .signAsync({
        id: model.id,
      })
      .then((token) => this.cacheManager.del(token));
  }
}
