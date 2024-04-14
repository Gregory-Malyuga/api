import { User } from 'src/domain/users/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from '../chat/chat.entity';
import { Message } from '../message/message.entity';

@Index(['chatId', 'userId'], { unique: true })
@Entity('chat_user')
export class ChatUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column()
  chatId: number;

  @Index()
  @Column()
  userId: number;

  @Index()
  @Column()
  roleId: number;

  @ManyToOne(() => Chat, (chat: Chat) => chat.chatUsers, {
    createForeignKeyConstraints: false,
  })
  chat: Promise<Chat>;

  @ManyToOne(() => User, (user: User) => user.chatUsers, {
    createForeignKeyConstraints: false,
  })
  user: Promise<User>;

  @OneToMany(() => Message, (message) => message.chatUser)
  messages: Promise<Message[]>;
}
