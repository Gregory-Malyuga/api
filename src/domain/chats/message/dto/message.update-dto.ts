import { MaxLength, MinLength } from 'class-validator';
import { AbstractUpdateDto } from 'src/common/dto/abstract.update-dto';

export class MessageUpdateDto extends AbstractUpdateDto {
  // TODO: сделать проверку на существование в базе данных
  chatUserId?: number;

  @MinLength(50)
  @MaxLength(2000)
  content?: string;
}
