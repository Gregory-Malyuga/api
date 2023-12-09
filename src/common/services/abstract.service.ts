import { Injectable } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';
import { AbstractFilterDto } from '../dto/abstract.filter-dto';
import { Pagination } from '../dto/pagination.dto';
import { AbstractListDto } from '../dto/abstract.list-dto';
import { BaseRepository } from '../repositories/base.repository';

@Injectable()
export class AbstractService<Entity extends ObjectLiteral> {
  constructor(protected repository: BaseRepository<Entity>) {}

  async findOne(where: AbstractFilterDto): Promise<Entity> {
    return await this.repository.findOneOrFailWithProcessWhere(where);
  }

  async findAndCount(
    where: AbstractFilterDto,
    pagination?: Pagination,
  ): Promise<AbstractListDto<Entity>> {
    return await this.repository
      .findAndCountWithProcessWhere(
        where,
        pagination?.offset,
        pagination?.limit,
      )
      .then(([items, total]) => new AbstractListDto<Entity>(items, total));
  }

  async create(dto: any): Promise<Entity> {
    return await this.repository.save(dto);
  }

  async update(dto: any, filter: AbstractFilterDto): Promise<Entity> {
    return await this.repository
      .findOneOrFailWithProcessWhere(filter)
      .then((model) => this.repository.save({ ...model, ...dto }));
  }

  async delete(filter: AbstractFilterDto): Promise<boolean> {
    return await this.repository
      .findOneOrFailWithProcessWhere(filter)
      .then((model) => this.repository.remove(model))
      .then(() => true);
  }
}
