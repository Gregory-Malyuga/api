import { MaxLength, MinLength } from 'class-validator';

export class UserUpdateDto {
  @MinLength(3)
  @MaxLength(255)
  login?: string;

  @MinLength(8)
  @MaxLength(255)
  password?: string;
}
