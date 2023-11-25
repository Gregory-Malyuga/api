import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFactory } from './factories/users.factory';
import { User } from './users.entity';
import { UserRepository } from './users.repository';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersResolver, UserRepository, UserFactory],
  exports: [UsersService, UserFactory],
})
export class UsersModule {}
