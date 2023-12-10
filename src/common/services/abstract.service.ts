import { Injectable } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';
import { AbstractFilterDto } from '../dto/abstract.filter-dto';
import { Pagination } from '../dto/pagination.dto';
import { AbstractListDto } from '../dto/abstract.list-dto';
import { BaseRepository } from '../repositories/base.repository';
import { AbstractUpdateDto } from '../dto/abstract.update-dto';
import { AbstractCreateDto } from '../dto/abstract.create-dto';

@Injectable()
export class AbstractService<
  Entity extends ObjectLiteral,
  CreateDto extends AbstractCreateDto,
  UpdateDto extends AbstractUpdateDto,
  FilterDto extends AbstractFilterDto,
> {
  constructor(protected repo: BaseRepository<Entity>) {}

  async findOne(where: FilterDto): Promise<Entity> {
    return await this.repo.findOneOrFailWithProcessWhere(where);
  }

  async findAndCount(
    where: AbstractFilterDto,
    pagination?: Pagination,
  ): Promise<AbstractListDto<Entity>> {
    return await this.repo
      .findAndCountWithProcessWhere(
        where,
        pagination?.offset,
        pagination?.limit,
      )
      .then(([items, total]) => new AbstractListDto<Entity>(items, total));
  }

  async create(dto: CreateDto): Promise<Entity> {
    return await this.repo.save({ ...this.repo.create(), ...dto });
  }

  async update(dto: UpdateDto, filter: FilterDto): Promise<Entity> {
    return await this.repo
      .findOneOrFailWithProcessWhere(filter)
      .then((model) => this.repo.save({ ...model, ...dto }));
  }

  async delete(filter: FilterDto): Promise<boolean> {
    return await this.repo
      .findOneOrFailWithProcessWhere(filter)
      .then((model) => this.repo.remove(model))
      .then(() => true);
  }
}
