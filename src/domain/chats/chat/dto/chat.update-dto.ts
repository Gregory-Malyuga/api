import { Max, MaxLength, Min, MinLength } from 'class-validator';

export class ChatUpdateDto {
  @MinLength(3)
  @MaxLength(255)
  name?: string;

  @MinLength(50)
  @MaxLength(2000)
  description?: string;
}
