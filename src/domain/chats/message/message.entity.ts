import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { Chat } from 'src/domain/chats/chat/chat.entity';
import { User } from 'src/domain/users/users.entity';

@Entity('messages')
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column()
  userId!: number;

  @Index()
  @Column()
  chatId!: number;

  @Index()
  @Column({ length: 2000 })
  content!: string;

  @CreateDateColumn()
  createdAt!: Timestamp;

  @UpdateDateColumn()
  updatedAt!: Timestamp;

  @DeleteDateColumn()
  deletedAt!: Timestamp;

  @ManyToOne(() => Chat, (chat: Chat) => chat.messages, {
    createForeignKeyConstraints: false,
  })
  chat: Promise<Chat>;

  @ManyToOne(() => User, (user: User) => user.messages, {
    createForeignKeyConstraints: false,
  })
  user: Promise<User>;
}
