import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { DataSource } from 'typeorm';
import { Message as Entity } from './message.entity';

@Injectable()
export class MessageRepository extends BaseRepository<Entity> {
  constructor(dataSource: DataSource) {
    super(Entity, dataSource.manager);
  }
}
