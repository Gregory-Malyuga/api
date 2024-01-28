import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AbstractListDto } from 'src/common/dto/abstract.list-dto';
import { Pagination } from 'src/common/dto/pagination.dto';
import { ChatUser as Entity } from './chat-user.entity';
import { ChatUserService as Service } from './chat-user.service';
import { ChatUserCreateDto as CreateDto } from './dto/chat-user.create-dto';
import { ChatUserFilterDto as FilterDto } from './dto/chat-user.filter-dto';
import { ChatUserUpdateDto as UpdateDto } from './dto/chat-user.update-dto';
import { UseGuards } from '@nestjs/common';
import { ChatUserGuard } from './chat-user.guard';

@Resolver('ChatUser')
export class ChatUserResolver {
  constructor(private readonly service: Service) {}

  @Query('chatUser')
  async findOne(@Args('filter') filter: FilterDto): Promise<Entity> {
    return await this.service.findOne(filter);
  }

  @Query('chatUsers')
  async findAndCount(
    @Args('filter') filter: FilterDto,
    @Args('pagination') pagination: Pagination,
  ): Promise<AbstractListDto<Entity>> {
    return await this.service.findAndCount(filter, pagination);
  }

  @UseGuards(ChatUserGuard)
  @Mutation('chatUserCreate')
  async create(@Args('dto') dto: CreateDto): Promise<Entity> {
    return await this.service.create(dto);
  }

  @UseGuards(ChatUserGuard)
  @Mutation('chatUserUpdate')
  async update(
    @Args('dto') dto: UpdateDto,
    @Args('filter') filter: FilterDto,
  ): Promise<Entity> {
    return await this.service.update(dto, filter);
  }

  @UseGuards(ChatUserGuard)
  @Mutation('chatUserDelete')
  async delete(@Args('filter') filter: FilterDto): Promise<boolean> {
    return await this.service.delete(filter);
  }
}
