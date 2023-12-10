import { MaxLength, MinLength } from 'class-validator';
import { AbstractCreateDto } from 'src/common/dto/abstract.create-dto';

export class ChatCreateDto extends AbstractCreateDto {
  @MinLength(3)
  @MaxLength(255)
  name!: string;

  @MinLength(50)
  @MaxLength(2000)
  description?: string;
}
