import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Area } from './area.entity';

@Injectable()
export class AreaRepository extends Repository<Area> {
  constructor(dataSource: DataSource) {
    super(Area, dataSource.manager);
  }
}
