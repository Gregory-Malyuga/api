import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/services/abstract.service';
import { MessageCreateDto as CreateDto } from './dto/message.create-dto';
import { MessageFilterDto as FilterDto } from './dto/message.filter-dto';
import { MessageUpdateDto as UpdateDto } from './dto/message.update-dto';
import { Message as Entity } from './message.entity';
import { MessageRepository as Repository } from './message.repository';

@Injectable()
export class MessageService extends AbstractService<
  Entity,
  CreateDto,
  UpdateDto,
  FilterDto
> {
  constructor(protected repo: Repository) {
    super(repo);
  }
}
