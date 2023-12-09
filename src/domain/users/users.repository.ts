import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User as Entity } from './users.entity';
import { BaseRepository } from 'src/common/repositories/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<Entity> {
  constructor(dataSource: DataSource) {
    super(Entity, dataSource.manager);
  }
}
