import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/services/abstract.service';
import { UserArea } from './user.entity';
import { UserAreaRepository } from './user.repository';

@Injectable()
export class UserAreaService extends AbstractService<UserArea> {
  constructor(protected repository: UserAreaRepository) {
    super(repository);
  }
}
