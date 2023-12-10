import { MaxLength, MinLength } from 'class-validator';
import { AbstractCreateDto } from 'src/common/dto/abstract.create-dto';

export class UserCreateDto extends AbstractCreateDto {
  // заменить на проверку существования
  @MinLength(3)
  @MaxLength(255)
  login!: string;

  @MinLength(8)
  @MaxLength(255)
  password!: string;
}
