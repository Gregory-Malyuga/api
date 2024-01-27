import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/services/abstract.service';
import { Chat as Entity } from './chat.entity';
import { ChatRepository as Repository } from './chat.repository';
import { ChatCreateDto as CreateDto } from './dto/chat.create-dto';
import { ChatUserService } from '../user/chat-user.service';
import { ChatUpdateDto as UpdateDto } from './dto/chat.update-dto';
import { ChatFilterDto as FilterDto } from './dto/chat.filter-dto';
import { User } from 'src/domain/users/users.entity';

@Injectable()
export class ChatService extends AbstractService<
  Entity,
  CreateDto,
  UpdateDto,
  FilterDto
> {
  constructor(
    protected repo: Repository,
    protected chatUserService: ChatUserService,
  ) {
    super(repo);
  }

  async processCreate(dto: CreateDto, user: User): Promise<Entity> {
    return await this.create({ ...dto, ...{ creatorId: user.id } });
  }
}
