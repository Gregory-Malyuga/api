import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index(['chatId', 'userId', 'roleId'])
@Entity('chat-user')
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
}
