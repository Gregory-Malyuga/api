import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { hash } from 'bcrypt';
import { AppModule } from '../app.module';
import { UserFactory } from './factories/users.factory';
import { UserRepository } from './users.repository';
import { UsersResolver } from './users.resolver';

describe('UsersResolver', () => {
  let app: INestApplication;
  let resolver: UsersResolver;
  let repository: UserRepository;
  let factory: UserFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    resolver = module.get<UsersResolver>(UsersResolver);
    repository = module.get<UserRepository>(UserRepository);
    factory = module.get<UserFactory>(UserFactory);

    await repository
      .find()
      .then((users) => users.map((user) => repository.remove(user)));

    app.init();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('create', async () => {
    await resolver
      .create({ username: 'username', password: 'password' })
      .then(async (user) => {
        expect(user.username).toBe('username');
        expect(user.password).toBe(await hash('password', user.salt));
      });
  });

  it('update', async () => {
    await factory
      .create()
      .then(
        async (user) =>
          await resolver.update(
            {
              ...user,
              ...{ username: 'new username', password: 'new password' },
            },
            { id: user.id },
          ),
      )
      .then(async (user) => {
        expect(user.username).toBe('new username');
        expect(user.password).toBe(await hash('new password', user.salt));
      });
  });

  it('delete', async () => {
    await factory.create().then(async (user) => {
      await resolver
        .delete({ id: user.id })
        .then((deleteResult) => expect(deleteResult).toBe(true));
      await repository
        .findOne({
          where: {
            id: user.id,
          },
        })
        .then((result) => expect(result).toBe(null));
    });
  });

  it('show', async () => {
    await factory.create({ username: 'admin' }).then(async (user) => {
      await resolver
        .findOne({ id: user.id })
        .then((user) => expect(user.username).toBe('admin'));
    });
  });

  afterAll(() => app.close());
});
