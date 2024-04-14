import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageFactory as Factory } from './factories/message.factory';
import { Message as Entity } from './message.entity';
import { MessageRepository as Repository } from './message.repository';
import { MessageResolver as Resolver } from './message.resolver';
import { MessageService as Service } from './message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  providers: [Repository, Service, Resolver, Factory],
  exports: [Repository, Factory],
})
export class MessageModule {}
