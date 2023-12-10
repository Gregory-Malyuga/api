import { MaxLength, MinLength } from 'class-validator';
import { AbstractUpdateDto } from 'src/common/dto/abstract.update-dto';

export class ChatUpdateDto extends AbstractUpdateDto {
  // заменить на проверку существования
  creatorId?: number;

  @MinLength(3)
  @MaxLength(255)
  name?: string;

  @MinLength(50)
  @MaxLength(2000)
  description?: string;
}
