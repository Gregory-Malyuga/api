import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { UserFactory } from 'src/domain/users/factories/users.factory';
import { User } from 'src/domain/users/users.entity';
import { Chat as Entity } from './chat.entity';
import { ChatRepository as Repository } from './chat.repository';
import { ChatResolver as Resolver } from './chat.resolver';
import { ChatFactory as Factory } from './factories/chat.factory';

describe('ChatsResolver', () => {
  let app: INestApplication;
  let resolver: Resolver;
  let repo: Repository;
  let factory: Factory;
  let userFactory: UserFactory;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    resolver = module.get<Resolver>(Resolver);
    repo = module.get<Repository>(Repository);
    factory = module.get<Factory>(Factory);
    userFactory = module.get<UserFactory>(UserFactory);

    await app.init();
  });

  beforeEach(async () => await repo.clear());

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('create', async () => {
    await userFactory.create().then((user: User) =>
      resolver
        .create(user, { name: 'name', description: 'description' })
        .then(async (entity: Entity) => {
          expect(entity.name).toBe('name');
          expect(entity.description).toBe('description');
          await resolver
            .findOne({
              id: entity.id,
            })
            .then(async (loadedEntity: Entity) => await loadedEntity.creator)
            .then((creator: User) => expect(creator.id).toBe(user.id));
        }),
    );
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
      await repo
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

  afterAll(async () => await app.close());
});
