import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/domain/users/users.module';
import { Chat as Entity } from './chat.entity';
import { ChatRepository } from './chat.repository';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { ChatFactory } from './factories/chat.factory';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Entity]), UsersModule],
  providers: [
    ChatService,
    ChatResolver,
    ChatRepository,
    ChatFactory,
    Repository,
  ],
})
export class ChatModule {}
