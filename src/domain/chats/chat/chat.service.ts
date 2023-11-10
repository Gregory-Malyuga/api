import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/services/abstract.service';
import { Chat as Entity } from './chat.entity';
import { ChatRepository as Repository } from './chat.repository';

@Injectable()
export class ChatService extends AbstractService<Entity> {
  constructor(protected repository: Repository) {
    super(repository);
  }
}
