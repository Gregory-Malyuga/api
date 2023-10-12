import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

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
}
