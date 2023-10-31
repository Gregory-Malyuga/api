import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserArea } from './user.entity';
import { UserAreaRepository } from './user.repository';
import { UserAreaResolver } from './user.resolver';
import { UserAreaService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserArea])],
  providers: [UserAreaService, UserAreaResolver, UserAreaRepository],
})
export class UserAreaModule {}
