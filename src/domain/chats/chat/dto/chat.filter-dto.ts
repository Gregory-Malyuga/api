import { AbstractFilterDto } from 'src/common/dto/abstract.filter-dto';

export class ChatFilterDto extends AbstractFilterDto {
  public ownerId?: [number] | number;
  public name?: string;
}
