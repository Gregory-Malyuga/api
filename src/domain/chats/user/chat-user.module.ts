import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatUser as Entity } from './chat-user.entity';
import { ChatUserRepository as Repository } from './chat-user.repository';
import { ChatUserService as Service } from './chat-user.service';
import { ChatUserFactory as Factory } from './factories/chat-user.factory';
import { UsersModule } from 'src/domain/users/users.module';
import { ChatModule } from 'src/domain/chats/chat/chat.module';

@Module({
  imports: [TypeOrmModule.forFeature([Entity]), UsersModule, ChatModule],
  providers: [Repository, Service, Factory],
  exports: [Repository, Service, Factory],
})
export class ChatUserModule {}
