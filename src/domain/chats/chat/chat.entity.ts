import { User } from 'src/domain/users/users.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
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

  // загружается только при вызове find
  @ManyToOne(() => User, (user: User) => user.chatsCreator, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'creator_id',
    foreignKeyConstraintName: 'creator_id',
  })
  creator: Promise<User>;

  @Column({ name: 'creator_id' })
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
