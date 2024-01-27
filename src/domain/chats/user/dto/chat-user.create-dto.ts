import { AbstractCreateDto } from 'src/common/dto/abstract.create-dto';

export class ChatUserCreateDto extends AbstractCreateDto {
  chatId!: number;
  userId!: number;
}
