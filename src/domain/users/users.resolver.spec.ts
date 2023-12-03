import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { hash } from 'bcrypt';
import { AppModule } from 'src/app.module';
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

    await app.init();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('create', async () => {
    await resolver
      .create({ login: 'login', password: 'password' })
      .then(async (user) => {
        expect(user.login).toBe('login');
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
              ...{ login: 'new login', password: 'new password' },
            },
            {
              id: user.id,
            },
          ),
      )
      .then(async (user) => {
        expect(user.login).toBe('new login');
        expect(user.password).toBe(await hash('new password', user.salt));
      });
  });

  it('delete', async () => {
    await factory.create().then(async (user) => {
      await resolver
        .delete({
          id: user.id,
        })
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
    await factory.create({ login: 'admin' }).then(async (user) => {
      await resolver
        .findOne({ id: user.id })
        .then((user) => expect(user.login).toBe('admin'));
    });
  });

  afterAll(() => app.close());
});
