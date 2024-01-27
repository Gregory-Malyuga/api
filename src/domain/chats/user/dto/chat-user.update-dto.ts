import { AbstractUpdateDto } from 'src/common/dto/abstract.update-dto';

// Везде тут написать првоерки на существование в таблицах
export class ChatUserUpdateDto extends AbstractUpdateDto {
  chatId?: number;
  userId?: number;
}
