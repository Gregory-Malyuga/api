import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { ChatsResolver } from './chat.resolver';
import { ChatsService } from './chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  providers: [ChatsService, ChatsResolver],
})
export class ChatsModule {}
