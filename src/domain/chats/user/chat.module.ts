import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/domain/users/users.module';
import { ChatUser as Entity } from './chat-user.entity';
import { ChatUserRepository } from './chat-user.repository';
import { ChatUserService } from './chat-user.service';
import { ChatUserFactory } from './factories/chat-user.factory';

@Module({
  imports: [TypeOrmModule.forFeature([Entity]), UsersModule],
  providers: [ChatUserService, ChatUserRepository, ChatUserFactory],
})
export class ChatModule {}
