import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { Chat } from '../chats/chat/chat.entity';
import { ChatUser } from '../chats/user/chat-user.entity';
import { Message } from '../chats/message/message.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  login!: string;

  @Column()
  password!: string;

  @Column()
  salt!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Timestamp;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Timestamp;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Timestamp;

  @OneToMany(() => ChatUser, (chatUser: ChatUser) => chatUser.user)
  chatUsers: Promise<ChatUser[]>;

  @OneToMany(() => Chat, (chat) => chat.creator)
  chatsCreator: Promise<Chat[]>;

  @OneToMany(() => Message, (message) => message.user)
  messages: Promise<Message[]>;
}
