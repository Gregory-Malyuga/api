import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AbstractListDto } from 'src/common/dto/abstract.list-dto';
import { Pagination } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/domain/auth/auth.guards';
import { Chat as Entity } from './chat.entity';
import { ChatService as Service } from './chat.service';
import { ChatCreateDto as CreateDto } from './dto/chat.create-dto';
import { ChatFilterDto as FilterDto } from './dto/chat.filter-dto';
import { ChatUpdateDto as UpdateDto } from './dto/chat.update-dto';

// TOOD: Добавить гварды на и продумать бизнес логику
@Resolver('Chat')
export class ChatResolver {
  constructor(private readonly service: Service) {}

  @Query('chat')
  async findOne(@Args('filter') filter: FilterDto): Promise<Entity> {
    return await this.service.findOne(filter);
  }

  @Query('chats')
  async findAndCount(
    @Args('filter') filter: FilterDto,
    @Args('pagination') pagination: Pagination,
  ): Promise<AbstractListDto<Entity>> {
    return new AbstractListDto<Entity>(
      await this.service.findAndCount(filter, pagination),
    );
  }

  @Mutation('chatCreate')
  async create(
    @Auth() auth: number,
    @Args('dto') dto: CreateDto,
  ): Promise<Entity> {
    return await this.service.create({ ...dto, ...{ creatorId: auth } });
  }

  @Mutation('chatUpdate')
  async update(
    @Auth() user: number,
    @Args('dto') dto: UpdateDto,
    @Args('filter') filter: FilterDto,
  ): Promise<Entity> {
    return await this.service.update(dto, filter);
  }

  @Mutation('chatDelete')
  async delete(
    @Auth() user: number,
    @Args('filter') filter: FilterDto,
  ): Promise<boolean> {
    return await this.service.delete(filter);
  }
}
