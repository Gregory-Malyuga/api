import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Area } from '../area.entity';
import { AreaService } from '../area.service';

@Injectable()
export class AreaFactory {
  constructor(private readonly service: AreaService) {}

  async create(dto?: object): Promise<Area> {
    return await this.service.create({
      name: faker.string.sample({ min: 1, max: 255 }),
      description: faker.string.sample({ min: 1, max: 2000 }),
      ...dto,
    });
  }
}
