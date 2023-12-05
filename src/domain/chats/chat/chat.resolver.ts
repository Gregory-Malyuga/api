import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AbstractListDto } from 'src/common/dto/abstract.list-dto';
import { Pagination } from 'src/common/dto/pagination.dto';
import { Auth } from '../../auth/auth.guards';
import { User } from '../../users/users.entity';
import { Chat as Entity } from './chat.entity';
import { ChatGuard } from './chat.guard';
import { ChatService as Service } from './chat.service';
import { ChatCreateDto as CreateDto } from './dto/chat.create-dto';
import { ChatFilterDto as FilterDto } from './dto/chat.filter-dto';
import { ChatUpdateDto as UpdateDto } from './dto/chat.update-dto';

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
    return await this.service.findAndCount(filter, pagination);
  }

  @Mutation('chatCreate')
  async create(
    @Auth() user: User,
    @Args('dto') dto: CreateDto,
  ): Promise<Entity> {
    return await this.service.create({ ...dto, ...{ creatorId: user.id } });
  }

  @UseGuards(ChatGuard)
  @Mutation('chatUpdate')
  async update(
    @Args('dto') dto: UpdateDto,
    @Args('filter') filter: FilterDto,
  ): Promise<Entity> {
    return await this.service.update(dto, filter);
  }

  @UseGuards(ChatGuard)
  @Mutation('chatDelete')
  async delete(@Args('filter') filter: FilterDto): Promise<boolean> {
    return await this.service.delete(filter);
  }
}
