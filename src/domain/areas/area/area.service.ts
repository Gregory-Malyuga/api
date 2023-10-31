import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/services/abstract.service';
import { Area } from './area.entity';
import { AreaRepository } from './area.repository';

@Injectable()
export class AreaService extends AbstractService<Area> {
  constructor(protected repository: AreaRepository) {
    super(repository);
  }
}
