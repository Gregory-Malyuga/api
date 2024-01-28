import { ChatUser } from 'src/domain/chats/user/chat-user.entity';
import { User } from 'src/domain/users/users.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('chats')
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user: User) => user.chatsCreator, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'creatorId',
    foreignKeyConstraintName: 'creatorId',
  })
  creator: Promise<User>;

  @Index()
  @Column({ nullable: false })
  creatorId!: number;

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

  @OneToMany(() => ChatUser, (chatUser) => chatUser.chat)
  chatUsers: Promise<ChatUser[]>;
}
