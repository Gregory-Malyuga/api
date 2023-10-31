import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './area.entity';
import { AreaRepository } from './area.repository';
import { AreaResolver } from './area.resolver';
import { AreaService } from './area.service';
import { AreaFactory } from './factories/area.factory';

@Module({
  imports: [TypeOrmModule.forFeature([Area])],
  providers: [AreaService, AreaResolver, AreaRepository, AreaFactory],
})
export class AreaModule {}
