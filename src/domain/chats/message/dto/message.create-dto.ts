import { MaxLength, MinLength } from 'class-validator';
import { AbstractCreateDto } from 'src/common/dto/abstract.create-dto';

export class MessageCreateDto extends AbstractCreateDto {
  // TODO: сделать проверку на существование в базе данных
  chatUserId!: number;

  @MinLength(50)
  @MaxLength(2000)
  content!: string;
}
