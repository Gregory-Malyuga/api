import { AbstractFilterDto } from 'src/common/dto/abstract.filter-dto';

export class ChatUserFilterDto extends AbstractFilterDto {
  // переделать на ExistsOnDatabase
  public chatId?: [number] | number;
  public userId?: [number] | number;
  public roleId?: [number] | number;
}
