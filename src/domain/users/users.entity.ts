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
import { ChatUser } from '../chats/user/chat-user.entity';

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
}
