import { UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AbstractListDto } from 'src/common/dto/abstract.list-dto';
import { Pagination } from 'src/common/dto/pagination.dto';
import { Auth, Public } from '../auth/auth.guards';
import { UserCreateDto } from './dto/users.create-dto';
import { UserFilterDto } from './dto/users.filter-dto';
import { UserUpdateDto } from './dto/users.update-dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

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
    return new AbstractListDto<User>(
      await this.service.findAndCount(filter, pagination),
    );
  }

  @Public()
  @Mutation('userCreate')
  async create(@Args('dto') dto: UserCreateDto): Promise<User> {
    return await this.service.create(dto);
  }

  @Mutation('userUpdate')
  async update(
    @Auth() user: number,
    @Args('dto') dto: UserUpdateDto,
    @Args('id') id: number,
  ): Promise<User> {
    this.canActivate(user, id);
    return await this.service.update(dto, id);
  }

  @Mutation('userDelete')
  async delete(@Auth() user: number, @Args('id') id: number): Promise<boolean> {
    this.canActivate(user, id);
    return await this.service.delete(id);
  }

  private canActivate(user: number, id: number): void {
    if (user !== id) {
      throw new UnauthorizedException();
    }
  }
}
