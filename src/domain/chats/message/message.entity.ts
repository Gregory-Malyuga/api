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
import { ChatUser } from '../user/chat-user.entity';

@Entity('messages')
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column()
  chatUserId!: number;

  @Index()
  @Column({ length: 2000 })
  content!: string;

  @CreateDateColumn()
  createdAt!: Timestamp;

  @UpdateDateColumn()
  updatedAt!: Timestamp;

  @DeleteDateColumn()
  deletedAt!: Timestamp;

  @ManyToOne(() => ChatUser, (chatUser: ChatUser) => chatUser.messages, {
    createForeignKeyConstraints: false,
  })
  chatUser: Promise<ChatUser>;
}
