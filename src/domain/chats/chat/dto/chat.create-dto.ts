import { MaxLength, MinLength } from 'class-validator';

export class ChatCreateDto {
  @MinLength(3)
  @MaxLength(255)
  name!: string;

  @MinLength(50)
  @MaxLength(2000)
  description?: string;
}
