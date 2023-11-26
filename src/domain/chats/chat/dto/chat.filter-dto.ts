import { Max, Min } from 'class-validator';
import { AbstractFilterDto } from 'src/common/dto/abstract.filter-dto';

export class ChatFilterDto extends AbstractFilterDto {
  constructor(
    public name?: string,
    public id?: number,
  ) {
    super();
  }
}
