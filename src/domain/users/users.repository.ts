import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './users.entity';
import { BaseRepository } from 'src/common/repositories/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.manager);
  }
}
