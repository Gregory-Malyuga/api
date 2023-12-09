import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AbstractListDto } from 'src/common/dto/abstract.list-dto';
import { Pagination } from 'src/common/dto/pagination.dto';
import { Public } from '../auth/auth.guards';
import { UserCreateDto as CreateDto } from './dto/users.create-dto';
import { UserFilterDto as FilterDto } from './dto/users.filter-dto';
import { UserUpdateDto as UpdateDto } from './dto/users.update-dto';
import { User as Entity } from './users.entity';
import { UsersService as Service } from './users.service';
import { UserGuard as Guard } from './users.guard';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly service: Service) {}

  @Query('user')
  async findOne(@Args('filter') filter: FilterDto): Promise<Entity> {
    return await this.service.findOne(filter);
  }

  @Query('users')
  async findAndCount(
    @Args('filter') filter: FilterDto,
    @Args('pagination') pagination: Pagination,
  ): Promise<AbstractListDto<Entity>> {
    return await this.service.findAndCount(filter, pagination);
  }

  @Public()
  @Mutation('userCreate')
  async create(@Args('dto') dto: CreateDto): Promise<Entity> {
    return await this.service.create(dto);
  }

  @Mutation('userUpdate')
  @UseGuards(Guard)
  async update(
    @Args('dto') dto: UpdateDto,
    @Args('filter') filter: FilterDto,
  ): Promise<Entity> {
    return await this.service.update(dto, filter);
  }

  @Mutation('userDelete')
  @UseGuards(Guard)
  async delete(@Args('filter') filter: FilterDto): Promise<boolean> {
    return await this.service.delete(filter);
  }
}
