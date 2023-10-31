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

@Entity('user_area')
export class UserArea extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column({ name: 'area_id' })
  areaId!: number;

  @Index()
  @Column({ name: 'user_id' })
  userId!: number;

  @Index()
  @Column({ name: 'is_muted', default: false })
  isMuted: boolean;

  @Index()
  @Column({ name: 'mute_expiration_at', nullable: true, type: 'timestamp' })
  muteExpirationAt: Timestamp;

  @Index()
  @Column({ name: 'is_blocked', default: false })
  isBlocked: boolean;

  @Index()
  @Column({ name: 'block_expiration_at', nullable: true, type: 'timestamp' })
  blockExpirationAt: Timestamp;

  @CreateDateColumn()
  createdAt!: Timestamp;

  @UpdateDateColumn()
  updatedAt!: Timestamp;

  @DeleteDateColumn()
  deletedAt!: Timestamp;
}
