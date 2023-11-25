import { Max, MaxLength, Min, MinLength } from 'class-validator';

export class UserCreateDto {
  @MinLength(3)
  @MaxLength(255)
  login!: string;

  @MinLength(8)
  @MaxLength(255)
  password!: string;
}
