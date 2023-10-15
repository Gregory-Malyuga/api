import { AbstractFilterDto } from 'common/dto/abstract.filter-dto';

export class UserFilterDto extends AbstractFilterDto {
  username?: string;
  password?: string;
}
