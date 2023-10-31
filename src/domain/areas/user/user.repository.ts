import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserArea } from './user.entity';

@Injectable()
export class UserAreaRepository extends Repository<UserArea> {
  constructor(dataSource: DataSource) {
    super(UserArea, dataSource.manager);
  }
}
