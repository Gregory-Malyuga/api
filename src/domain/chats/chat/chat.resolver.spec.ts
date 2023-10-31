import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { ChatRepository } from './chat.repository';
import { ChatResolver } from './chat.resolver';
import { ChatFactory } from './factories/chat.factory';

describe('ChatsResolver', () => {
  let app: INestApplication;
  let resolver: ChatResolver;
  let repository: ChatRepository;
  let factory: ChatFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    resolver = module.get<ChatResolver>(ChatResolver);
    repository = module.get<ChatRepository>(ChatRepository);
    factory = module.get<ChatFactory>(ChatFactory);

    await repository
      .find()
      .then((chats) => chats.map((chat) => repository.remove(chat)));

    app.init();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('create', async () => {
    await resolver
      .create({ name: 'name', description: 'description' })
      .then(async (chat) => {
        expect(chat.name).toBe('name');
        expect(chat.description).toBe('description');
      });
  });

  it('update', async () => {
    await factory
      .create()
      .then(
        async (chat) =>
          await resolver.update(
            chat.id,
            {
              ...chat,
              ...{ name: 'new name', description: 'new description' },
            },
            chat.id,
          ),
      )
      .then(async (chat) => {
        expect(chat.name).toBe('new name');
        expect(chat.description).toBe('new description');
      });
  });

  it('delete', async () => {
    await factory.create().then(async (chat) => {
      await resolver
        .delete(chat.id, chat.id)
        .then((deleteResult) => expect(deleteResult).toBe(true));
      await repository
        .findOne({
          where: {
            id: chat.id,
          },
        })
        .then((result) => expect(result).toBe(null));
    });
  });

  it('show', async () => {
    await factory.create({ name: 'admin' }).then(async (chat) => {
      await resolver
        .findOne({ id: chat.id })
        .then((chat) => expect(chat.name).toBe('admin'));
    });
  });

  afterAll(() => app.close());
});
