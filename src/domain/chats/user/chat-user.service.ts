import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/services/abstract.service';
import { ChatUser as Entity } from './chat-user.entity';
import { ChatUserRepository as Repository } from './chat-user.repository';
import { ChatUserCreateDto as CreateDto } from './dto/chat-user.create-dto';
import { ChatUserUpdateDto as UpdateDto } from './dto/chat-user.update-dto';
import { ChatUserFilterDto as FilterDto } from './dto/chat-user.filter-dto';

@Injectable()
export class ChatUserService extends AbstractService<
  Entity,
  CreateDto,
  UpdateDto,
  FilterDto
> {
  constructor(protected repository: Repository) {
    super(repository);
  }
}
