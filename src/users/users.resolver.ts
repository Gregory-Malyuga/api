import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AbstractListDto } from 'src/common/dto/abstract.list-dto';
import { Pagination } from 'src/common/dto/pagination.dto';
import { UserCreateDto } from './dto/users.create-dto';
import { UserFilterDto } from './dto/users.filter-dto';
import { UserUpdateDto } from './dto/users.update-dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

export type UserSortableColumns = 'id' | 'username' | 'password';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly service: UsersService) {}

  @Query('user')
  async findOne(@Args('id') id: number): Promise<User> {
    return await this.service.findOne(id);
  }

  @Query('users')
  async findAndCount(
    @Args('filter') filter: UserFilterDto,
    @Args('pagination') pagination: Pagination,
  ): Promise<AbstractListDto<User>> {
    return new AbstractListDto<User>(
      await this.service.findAndCount(filter, pagination),
    );
  }

  @Mutation('userCreate')
  async create(@Args('dto') dto: UserCreateDto): Promise<User> {
    return await this.service.create(dto);
  }

  @Mutation('userUpdate')
  async update(@Args('dto') dto: UserUpdateDto): Promise<User> {
    return await this.service.update(dto);
  }
}
