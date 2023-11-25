import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AbstractListDto } from 'src/common/dto/abstract.list-dto';
import { Pagination } from 'src/common/dto/pagination.dto';
import { Public } from '../auth/auth.guards';
import { UserCreateDto } from './dto/users.create-dto';
import { UserFilterDto } from './dto/users.filter-dto';
import { UserUpdateDto } from './dto/users.update-dto';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UserGuard } from './users.guard';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly service: UsersService) {}

  @Query('user')
  async findOne(@Args('filter') filter: UserFilterDto): Promise<User> {
    return await this.service.findOne(filter);
  }

  @Query('users')
  async findAndCount(
    @Args('filter') filter: UserFilterDto,
    @Args('pagination') pagination: Pagination,
  ): Promise<AbstractListDto<User>> {
    return await this.service.findAndCount(filter, pagination);
  }

  @Public()
  @Mutation('userCreate')
  async create(@Args('dto') dto: UserCreateDto): Promise<User> {
    return await this.service.create(dto);
  }

  @Mutation('userUpdate')
  @UseGuards(UserGuard)
  async update(
    @Args('dto') dto: UserUpdateDto,
    @Args('filter') filter: UserFilterDto,
  ): Promise<User> {
    return await this.service.update(dto, filter);
  }

  @Mutation('userDelete')
  @UseGuards(UserGuard)
  async delete(@Args('filter') filter: UserFilterDto): Promise<boolean> {
    return await this.service.delete(filter);
  }
}
