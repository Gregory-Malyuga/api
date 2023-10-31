import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Auth } from 'src/domain/auth/auth.guards';
import { UserAreaCreateDto } from './dto/user-area.create.dto';
import { UserAreaUpdateDto } from './dto/user-area.update.dto';
import { UserAreaFilterDto } from './dto/user.area.filter.dto';
import { UserArea } from './user.entity';
import { UserAreaService } from './user.service';

// TOOD: Добавить гварды и продумать бизнес логику
@Resolver('UserArea')
export class UserAreaResolver {
  constructor(private readonly service: UserAreaService) {}

  @Mutation('userAreaCreate')
  async create(@Args('dto') dto: UserAreaCreateDto): Promise<UserArea> {
    return await this.service.create(dto);
  }

  @Mutation('userAreaUpdate')
  async update(
    @Auth() user: number,
    @Args('dto') dto: UserAreaUpdateDto,
    @Args('filter') filter: UserAreaFilterDto,
  ): Promise<UserArea> {
    return await this.service.update(dto, filter);
  }

  @Mutation('userAreaDelete')
  async delete(
    @Auth() user: number,
    @Args('filter') filter: UserAreaFilterDto,
  ): Promise<boolean> {
    return await this.service.delete(filter);
  }
}
