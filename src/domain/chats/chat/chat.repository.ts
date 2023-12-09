import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Chat as Entity } from './chat.entity';
import { BaseRepository } from 'src/common/repositories/base.repository';

@Injectable()
export class ChatRepository extends BaseRepository<Entity> {
  constructor(dataSource: DataSource) {
    super(Entity, dataSource.manager);
  }
}
