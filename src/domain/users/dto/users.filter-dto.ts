import { AbstractFilterDto } from 'src/common/dto/abstract.filter-dto';

export class UserFilterDto extends AbstractFilterDto {
  constructor(public login?: string) {
    super();
  }
}
