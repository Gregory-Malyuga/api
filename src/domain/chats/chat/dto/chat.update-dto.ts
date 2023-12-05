import { MaxLength, MinLength } from 'class-validator';

export class ChatUpdateDto {
  // заменить на проверку существования
  creatorId?: number;

  @MinLength(3)
  @MaxLength(255)
  name?: string;

  @MinLength(50)
  @MaxLength(2000)
  description?: string;
}
