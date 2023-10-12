import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AbstractRangeDto } from 'src/common/dto/abstract.range-dto';
import { AbstractIndexResourceDto } from '../common/resources/abstract.index-resource-dto';
import { UserCreateDto } from './dto/users.create-dto';
import { UserUpdateDto } from './dto/users.update-dto';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UserIndexDto } from './dto/users.index-dto';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly service: UsersService) {}

  @Query('user')
  async findOne(@Args('id') id: number): Promise<User> {
    return await this.service.findOne(id);
  }

  @Query('users')
  async findManyAndCount(
    @Args('filter') filter: UserIndexDto,
    @Args('range') range: AbstractRangeDto,
  ): Promise<AbstractIndexResourceDto<User>> {
    return new AbstractIndexResourceDto(
      await this.service.findManyAndCount(filter, range),
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
