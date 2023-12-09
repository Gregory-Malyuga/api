import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ChatUser as Entity } from './chat-user.entity';
import { BaseRepository } from 'src/common/repositories/base.repository';

@Injectable()
export class ChatUserRepository extends BaseRepository<Entity> {
  constructor(dataSource: DataSource) {
    super(Entity, dataSource.manager);
  }
}
