import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Chat as Entity } from './chat.entity';

@Injectable()
export class ChatRepository extends Repository<Entity> {
  constructor(dataSource: DataSource) {
    super(Entity, dataSource.manager);
  }
}
