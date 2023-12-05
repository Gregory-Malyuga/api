import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ChatUser as Entity } from './chat-user.entity';

@Injectable()
export class ChatUserRepository extends Repository<Entity> {
  constructor(dataSource: DataSource) {
    super(Entity, dataSource.manager);
  }
}
