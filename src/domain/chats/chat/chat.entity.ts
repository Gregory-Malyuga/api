import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { ChatUser } from '../user/chat-user.entity';
import { User } from 'src/domain/users/users.entity';

@Entity('chats')
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => ChatUser, (chatUser) => chatUser.chat)
  chatUsers: Promise<ChatUser[]>;

  // @OneToOne(() => ChatUser, (chatUser: ChatUser) => chatUser.owner)
  // owner: Promise<User>;

  // @ManyToMany(() => ChatUser, (chatUser: ChatUser) => chatUser.members)
  // members: Promise<User[]>;

  @Index()
  @Column()
  creatorId: number;

  @Index()
  @Column()
  name!: string;

  @Column({ nullable: true, length: 2000 })
  description?: string;

  @CreateDateColumn()
  createdAt!: Timestamp;

  @UpdateDateColumn()
  updatedAt!: Timestamp;

  @DeleteDateColumn()
  deletedAt!: Timestamp;
}
