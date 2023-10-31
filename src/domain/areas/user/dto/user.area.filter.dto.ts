import { AbstractFilterDto } from 'src/common/dto/abstract.filter-dto';

export class UserAreaFilterDto extends AbstractFilterDto {
  areaId?: number;
  userId?: number;
}
