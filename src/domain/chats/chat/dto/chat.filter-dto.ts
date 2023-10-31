import { Max, Min } from 'class-validator';
import { AbstractFilterDto } from 'src/common/dto/abstract.filter-dto';

export class ChatFilterDto extends AbstractFilterDto {
  @Min(3)
  @Max(255)
  name?: string;
}
