import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { ChatRepository as Repository } from './chat.repository';
import { ChatResolver as Resolver } from './chat.resolver';
import { ChatFactory as Factory } from './factories/chat.factory';

describe('ChatsResolver', () => {
  let app: INestApplication;
  let resolver: Resolver;
  let repository: Repository;
  let factory: Factory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    resolver = module.get<Resolver>(Resolver);
    repository = module.get<Repository>(Repository);
    factory = module.get<Factory>(Factory);

    await repository
      .find()
      .then((Chats) => Chats.map((Chat) => repository.remove(Chat)));

    app.init();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('create', async () => {
    await resolver
      // TODO: Переделать на реальные данные с реальным пользователем
      .create({ name: 'name', description: 'description' })
      .then(async (Chat) => {
        expect(Chat.name).toBe('name');
        expect(Chat.description).toBe('description');
      });
  });

  it('update', async () => {
    await factory
      .create()
      .then(
        async (Chat) =>
          await resolver.update(
            {
              ...Chat,
              ...{ name: 'new name', description: 'new description' },
            },
            {
              id: Chat.id,
            },
          ),
      )
      .then(async (Chat) => {
        expect(Chat.name).toBe('new name');
        expect(Chat.description).toBe('new description');
      });
  });

  it('delete', async () => {
    await factory.create().then(async (Chat) => {
      await resolver
        .delete({
          id: Chat.id,
        })
        .then((deleteResult) => expect(deleteResult).toBe(true));
      await repository
        .findOne({
          where: {
            id: Chat.id,
          },
        })
        .then((result) => expect(result).toBe(null));
    });
  });

  it('show', async () => {
    await factory.create({ name: 'admin' }).then(async (Chat) => {
      await resolver
        .findOne({ id: Chat.id })
        .then((Chat) => expect(Chat.name).toBe('admin'));
    });
  });

  afterAll(() => app.close());
});
