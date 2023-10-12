import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserCreateDto } from './dto/users.create-dto';
import { UserUpdateDto } from './dto/users.update-dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly service: UsersService) {}

  @Query('userFindOne')
  async findOne(@Args('id') id: number): Promise<User> {
    return await this.service.findOne(id);
  }

  @Query('userFindManyAndCount')
  async findManyAndCount(): Promise<[User[], number]> {
    return await this.service.findManyAndCount();
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
