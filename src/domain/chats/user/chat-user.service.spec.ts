import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from 'src/app.module';
import { getTestModules } from 'src/test.module';
import { ChatUserModule as Module } from './chat-user.module';
import { ChatUserService as Service } from './chat-user.service';
import { UsersModule } from 'src/domain/users/users.module';
import { ChatModule } from '../chat/chat.module';
import { UserFactory } from 'src/domain/users/factories/users.factory';
import { ChatFactory } from '../chat/factories/chat.factory';
import { ChatUserRoles as Roles } from './enum/chat-user.roles';
import { ChatUser as Entity } from './chat-user.entity';
import { Chat } from '../chat/chat.entity';
import { User } from 'src/domain/users/users.entity';
import { INestApplication } from '@nestjs/common';
import { ChatUserFactory as Factory } from './factories/chat-user.factory';
import { AbstractListDto } from 'src/common/dto/abstract.list-dto';

describe('ChatUserService', () => {
  let app: INestApplication;
  let factory: Factory;
  let service: Service;
  let userFactory: UserFactory;
  let chatFactory: ChatFactory;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...getTestModules(),
        TypeOrmModule.forRoot(DatabaseConfig),
        Module,
        UsersModule,
        ChatModule,
      ],
    }).compile();

    app = module.createNestApplication();
    service = module.get<Service>(Service);
    factory = module.get<Factory>(Factory);
    userFactory = module.get<UserFactory>(UserFactory);
    chatFactory = module.get<ChatFactory>(ChatFactory);

    await app.init();
  });

  it('create', async () => {
    await userFactory.create().then(
      async (user: User) =>
        await chatFactory.create().then(
          async (chat: Chat) =>
            await service
              .create({
                userId: user.id,
                chatId: chat.id,
                roleId: Roles.member,
              })
              .then(async (entity: Entity) => {
                expect(entity.chatId).toEqual(chat.id);
                expect(entity.userId).toEqual(user.id);
              }),
        ),
    );
  });

  it('update', async () => {
    await factory
      .create()
      .then(
        async (created: Entity) =>
          await service
            .update({ roleId: Roles.admin }, created)
            .then((updated) => expect(created.roleId).not.toBe(updated.roleId)),
      );
  });

  it('delete', async () => {
    await factory.create().then(
      async (entity: Entity) =>
        await service
          .delete({
            chatId: entity.chatId,
            userId: entity.userId,
          })
          .then((result: boolean) => expect(result).toBe(true))
          .then(
            async () =>
              await service
                .findAndCount({
                  chatId: entity.chatId,
                  userId: entity.userId,
                })
                .then((list: AbstractListDto<Entity>) =>
                  expect(list.items).toHaveLength(0),
                ),
          ),
    );
  });

  it('show', async () => {
    await factory.create().then(
      async (entity: Entity) =>
        await service
          .findOne({
            chatId: entity.chatId,
            userId: entity.userId,
          })
          .then((finded: Entity) => expect(finded.id).toBe(entity.id)),
    );
  });

  it('check relation chat', async () => {
    await factory.create().then(
      async (entity: Entity) =>
        await service
          .findOne({
            chatId: entity.chatId,
            userId: entity.userId,
          })
          .then(async (finded: Entity) => await finded.chat)
          .then((chat: Chat) => expect(chat.id).toBe(entity.chatId)),
    );
  });

  it('check relation user', async () => {
    await factory.create().then(
      async (entity: Entity) =>
        await service
          .findOne({
            chatId: entity.chatId,
            userId: entity.userId,
          })
          .then(async (finded: Entity) => await finded.user)
          .then((user: User) => expect(user.id).toBe(entity.userId)),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => await app.close());
});
