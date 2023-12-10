import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatUser as Entity } from './chat-user.entity';
import { ChatUserRepository as Repository } from './chat-user.repository';
import { ChatUserService as Service } from './chat-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  providers: [Repository, Service],
  exports: [Repository, Service],
})
export class ChatUserModule {}
