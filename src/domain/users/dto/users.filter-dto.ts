import { AbstractFilterDto } from 'src/common/dto/abstract.filter-dto';
import { MaxLength, MinLength } from 'class-validator';

export class UserFilterDto extends AbstractFilterDto {
  @MinLength(3)
  @MaxLength(255)
  login?: string;
}
