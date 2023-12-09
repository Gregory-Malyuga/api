import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFactory as Factory } from './factories/users.factory';
import { User as Entity } from './users.entity';
import { UserRepository as Repository } from './users.repository';
import { UsersResolver as Resolver } from './users.resolver';
import { UsersService as Service } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  providers: [Repository, Service, Resolver, Factory],
  exports: [Repository, Factory],
})
export class UsersModule {}
