import { AbstractFilterDto } from 'src/common/dto/abstract.filter-dto';

export class ChatFilterDto extends AbstractFilterDto {
  // переделать на ExistsOnDatabase
  public creatorId?: [number] | number;
  public name?: string;
}
