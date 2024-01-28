import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { ChatUserService as Service } from './chat-user.service';
import { UserFactory } from 'src/domain/users/factories/users.factory';
import { ChatFactory } from '../chat/factories/chat.factory';
import { ChatUserFactory as Factory } from './factories/chat-user.factory';
import { ChatUser as Entity } from './chat-user.entity';
import { ChatUserRoles } from './enum/chat-user.roles';
import { AbstractListDto } from 'src/common/dto/abstract.list-dto';
import { Chat } from 'src/domain/chats/chat/chat.entity';
import { User } from 'src/domain/users/users.entity';

describe('ChatUserService', () => {
  let app: INestApplication;
  let userFactory: UserFactory;
  let chatFactory: ChatFactory;
  let service: Service;
  let factory: Factory;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    service = module.get<Service>(Service);
    factory = module.get<Factory>(Factory);
    userFactory = module.get<UserFactory>(UserFactory);
    chatFactory = module.get<ChatFactory>(ChatFactory);

    await app.init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('schould be created', async () => {
    const user = await userFactory.create();
    const chat = await chatFactory.create();
    expect(
      await service.create({
        userId: user.id,
        chatId: chat.id,
        roleId: ChatUserRoles.owner,
      }),
    ).not.toBeUndefined();
  });

  it('schould be updated', async () => {
    const user = await userFactory.create();
    const chatUser = await factory.create();
    expect(
      (
        await service.update(
          { userId: user.id },
          {
            userId: chatUser.userId,
            chatId: chatUser.chatId,
          },
        )
      ).userId,
    ).toBe(user.id);
  });

  it('schould be findOne', async () => {
    const chatUser = await factory.create();
    expect(
      (
        await service.findOne({
          userId: chatUser.userId,
          chatId: chatUser.chatId,
        })
      ).id,
    ).toBe(chatUser.id);
  });

  it('schould be findAndCount', async () => {
    await factory.create().then(
      async (entity: Entity) =>
        await service
          .findAndCount({
            chatId: entity.chatId,
            userId: entity.userId,
          })
          .then((list: AbstractListDto<Entity>) =>
            list.items.map((entity: Entity) => entity.id),
          )
          .then((ids) => expect(ids).toContain(entity.id)),
    );
  });

  it('schould be delete', async () => {
    const chatUser = await factory.create();
    await service
      .delete({ chatId: chatUser.chatId, userId: chatUser.userId })
      .then((result) => expect(result).toBe(true));
  });

  it('schould be attached to chat', async () => {
    await factory.create().then(
      async (entity: Entity) =>
        await service
          .findOne({ chatId: entity.chatId, userId: entity.userId })
          .then(async (loadedEntity: Entity) => await loadedEntity.chat)
          .then((chat: Chat) => expect(chat.id).toEqual(entity.chatId)),
    );
  });

  it('schould be attached to user', async () => {
    await factory.create().then(
      async (entity: Entity) =>
        await service
          .findOne({ chatId: entity.chatId, userId: entity.userId })
          .then(async (loadedEntity: Entity) => await loadedEntity.user)
          .then((user: User) => expect(user.id).toEqual(entity.userId)),
    );
  });

  afterAll(async () => app.close);
});
