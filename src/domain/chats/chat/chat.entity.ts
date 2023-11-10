import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('chats')
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

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
