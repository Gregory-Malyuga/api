import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/services/abstract.service';
import { Chat } from './chat.entity';
import { ChatRepository } from './chat.repository';

@Injectable()
export class ChatService extends AbstractService<Chat> {
  constructor(protected repository: ChatRepository) {
    super(repository);
  }
}
