import { Max, Min } from 'class-validator';

export class UserCreateDto {
  @Min(3)
  @Max(255)
  login!: string;

  @Min(16)
  @Max(255)
  password!: string;
}
