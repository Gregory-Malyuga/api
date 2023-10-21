import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { AppModule } from '../app.module';
import { User } from './users.entity';
import { UsersResolver } from './users.resolver';

describe('UsersResolver', () => {
  let app: INestApplication;
  let resolver: UsersResolver;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    resolver = module.get<UsersResolver>(UsersResolver);
    repository = module.;

    await repository
      .find()
      .then((users) => users.map((user) => repository.remove(user)));

    app.init();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  test('create user', async () => {
    await resolver
      .create({ username: 'username', password: 'password' })
      .then((user) => {
        expect(user.username).toBe('1username');
        expect(user.password).toBe(hash('password', user.salt));
      });
  });

  afterAll(() => app.close());
});
