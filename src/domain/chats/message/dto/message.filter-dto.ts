import { MaxLength, MinLength } from 'class-validator';
import { AbstractFilterDto } from 'src/common/dto/abstract.filter-dto';

export class MessageFilterDto extends AbstractFilterDto {
  // TODO: сделать проверку на существование в базе данных
  chatUserId?: number;

  @MinLength(50)
  @MaxLength(2000)
  content?: string;
}
