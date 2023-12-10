import { AbstractCreateDto } from 'src/common/dto/abstract.create-dto';

// Везде тут написать првоерки на существование в таблицах
export class ChatUserCreateDto extends AbstractCreateDto {
  chatId!: number;

  userId!: number;

  roleId!: number;
}
