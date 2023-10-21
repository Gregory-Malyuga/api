import { AbstractFilterDto } from 'src/common/dto/abstract.filter-dto';

export class UserFilterDto extends AbstractFilterDto {
  login?: string;
  password?: string;
}
