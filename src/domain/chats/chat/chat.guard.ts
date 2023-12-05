import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AbstractGuard } from 'src/common/guard/abstract.guard';
import { Chat as Entity } from './chat.entity';

// Гвард запрещающий удалять/обновлять чаты кроме своих
@Injectable()
export class ChatGuard extends AbstractGuard<Entity> {
  async specialCanActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    return await this.repository
      .findOneBy(this.processFilter(gqlContext.getArgs().filter))
      .then((model: Entity) => this.user.id === model.creatorId);
  }
}
