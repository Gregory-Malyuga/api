import { MaxLength, MinLength } from 'class-validator';
import { AbstractUpdateDto } from 'src/common/dto/abstract.update-dto';

export class UserUpdateDto extends AbstractUpdateDto {
  // заменить на проверку существования
  @MinLength(3)
  @MaxLength(255)
  login?: string;

  @MinLength(8)
  @MaxLength(255)
  password?: string;
}
