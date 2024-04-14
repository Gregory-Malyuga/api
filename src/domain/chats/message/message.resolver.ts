import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AbstractListDto } from 'src/common/dto/abstract.list-dto';
import { Pagination } from 'src/common/dto/pagination.dto';
import { MessageCreateDto as CreateDto } from './dto/message.create-dto';
import { MessageFilterDto as FilterDto } from './dto/message.filter-dto';
import { MessageUpdateDto as UpdateDto } from './dto/message.update-dto';
import { Message as Entity } from './message.entity';
import { MessageGuard as Guard } from './message.guard';
import { MessageService as Service } from './message.service';

@Resolver('Message')
export class MessageResolver {
  constructor(private readonly service: Service) {}

  @Query('message')
  async findOne(@Args('filter') filter: FilterDto): Promise<Entity> {
    return await this.service.findOne(filter);
  }

  @Query('messages')
  async findAndCount(
    @Args('filter') filter: FilterDto,
    @Args('pagination') pagination: Pagination,
  ): Promise<AbstractListDto<Entity>> {
    return await this.service.findAndCount(filter, pagination);
  }

  @Mutation('messageCreate')
  async create(@Args('dto') dto: CreateDto): Promise<Entity> {
    return await this.service.create(dto);
  }

  @UseGuards(Guard)
  @Mutation('messageUpdate')
  async update(
    @Args('dto') dto: UpdateDto,
    @Args('filter') filter: FilterDto,
  ): Promise<Entity> {
    return await this.service.update(dto, filter);
  }

  @UseGuards(Guard)
  @Mutation('messageDelete')
  async delete(@Args('filter') filter: FilterDto): Promise<boolean> {
    return await this.service.delete(filter);
  }
}
