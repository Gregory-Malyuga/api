import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { hash } from 'bcrypt';
import { AppModule } from 'src/app.module';
import { UserFactory as Factory } from './factories/users.factory';
import { UserRepository as Repository } from './users.repository';
import { UsersResolver as Resolver } from './users.resolver';

describe('UsersResolver', () => {
  let app: INestApplication;
  let resolver: Resolver;
  let repo: Repository;
  let factory: Factory;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    resolver = module.get<Resolver>(Resolver);
    repo = module.get<Repository>(Repository);
    factory = module.get<Factory>(Factory);

    await app.init();
  });

  beforeEach(async () => await repo.clear());

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('create', async () => {
    await resolver
      .create({ login: 'login', password: 'password' })
      .then(async (model) => {
        expect(model.login).toBe('login');
        expect(model.password).toBe(await hash('password', model.salt));
      });
  });

  it('update', async () => {
    await factory
      .create()
      .then(
        async (model) =>
          await resolver.update(
            {
              ...model,
              ...{ login: 'new login', password: 'new password' },
            },
            {
              id: model.id,
            },
          ),
      )
      .then(async (model) => {
        expect(model.login).toBe('new login');
        expect(model.password).toBe(await hash('new password', model.salt));
      });
  });

  it('delete', async () => {
    await factory.create().then(async (model) => {
      await resolver
        .delete({
          id: model.id,
        })
        .then((deleteResult) => expect(deleteResult).toBe(true));
      await repo
        .findOne({
          where: {
            id: model.id,
          },
        })
        .then((result) => expect(result).toBe(null));
    });
  });

  it('show', async () => {
    await factory
      .create({ login: 'admin', password: 'password' })
      .then(async (model) => {
        await resolver
          .findOne({ id: model.id })
          .then((model) => expect(model.login).toBe('admin'));
      });
  });

  afterAll(async () => await app.close());
});
