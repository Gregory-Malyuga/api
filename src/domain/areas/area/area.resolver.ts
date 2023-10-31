import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AbstractListDto } from 'src/common/dto/abstract.list-dto';
import { Pagination } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/domain/auth/auth.guards';
import { Area } from './area.entity';
import { AreaService } from './area.service';
import { AreaCreateDto } from './dto/area.create-dto';
import { AreaFilterDto } from './dto/area.filter-dto';
import { AreaUpdateDto } from './dto/area.update-dto';

// TOOD: Добавить гварды на и продумать бизнес логику
@Resolver('Area')
export class AreaResolver {
  constructor(private readonly service: AreaService) {}

  @Query('area')
  async findOne(@Args('filter') filter: AreaFilterDto): Promise<Area> {
    return await this.service.findOne(filter);
  }

  @Query('areas')
  async findAndCount(
    @Args('filter') filter: AreaFilterDto,
    @Args('pagination') pagination: Pagination,
  ): Promise<AbstractListDto<Area>> {
    return new AbstractListDto<Area>(
      await this.service.findAndCount(filter, pagination),
    );
  }

  @Mutation('areaCreate')
  async create(
    @Auth() auth: number,
    @Args('dto') dto: AreaCreateDto,
  ): Promise<Area> {
    return await this.service.create({ ...dto, ...{ creatorId: auth } });
  }

  @Mutation('areaUpdate')
  async update(
    @Auth() user: number,
    @Args('dto') dto: AreaUpdateDto,
    @Args('filter') filter: AreaFilterDto,
  ): Promise<Area> {
    return await this.service.update(dto, filter);
  }

  @Mutation('areaDelete')
  async delete(
    @Auth() user: number,
    @Args('filter') filter: AreaFilterDto,
  ): Promise<boolean> {
    return await this.service.delete(filter);
  }
}
