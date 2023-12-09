import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/domain/users/users.module';
import { ChatUser as Entity } from './chat-user.entity';
import { ChatUserRepository as Repository } from './chat-user.repository';
import { ChatUserService as Service } from './chat-user.service';
import { ChatUserFactory as Factory } from './factories/chat-user.factory';

@Module({
  imports: [TypeOrmModule.forFeature([Entity]), UsersModule, ChatModule],
  providers: [Repository, Service, Repository, Factory],
})
export class ChatModule {}
