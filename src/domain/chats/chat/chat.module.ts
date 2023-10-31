import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { ChatRepository } from './chat.repository';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { ChatFactory } from './factories/chat.factory';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  providers: [ChatService, ChatResolver, ChatRepository, ChatFactory],
})
export class ChatModule {}
