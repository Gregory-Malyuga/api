import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/services/abstract.service';
import { ChatUser as Entity } from './chat-user.entity';
import { ChatUserRepository as Repository } from './chat-user.repository';

@Injectable()
export class ChatUserService extends AbstractService<Entity> {
  constructor(protected repository: Repository) {
    super(repository);
  }
}
