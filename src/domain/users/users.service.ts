import { Inject, Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { AbstractService } from 'src/common/services/abstract.service';
import { UserCreateDto as CreateDto } from './dto/users.create-dto';
import { UserFilterDto as FilterDto } from './dto/users.filter-dto';
import { UserUpdateDto as UpdateDto } from './dto/users.update-dto';
import { User as Entity } from './users.entity';
import { UserRepository as Repository } from './users.repository';

@Injectable()
export class UsersService extends AbstractService<
  Entity,
  CreateDto,
  UpdateDto,
  FilterDto
> {
  constructor(protected repository: Repository) {
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
      }
      return this.repository.save({ ...model, ...dto });
    });
  }
}
