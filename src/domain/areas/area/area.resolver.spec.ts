import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { AreaRepository } from './area.repository';
import { AreaResolver } from './area.resolver';
import { AreaFactory } from './factories/area.factory';

describe('AreasResolver', () => {
  let app: INestApplication;
  let resolver: AreaResolver;
  let repository: AreaRepository;
  let factory: AreaFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    resolver = module.get<AreaResolver>(AreaResolver);
    repository = module.get<AreaRepository>(AreaRepository);
    factory = module.get<AreaFactory>(AreaFactory);

    await repository
      .find()
      .then((Areas) => Areas.map((Area) => repository.remove(Area)));

    app.init();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('create', async () => {
    await resolver
      // TODO: Переделать на реальные данные с реальным пользователем
      .create(1, { name: 'name', description: 'description' })
      .then(async (Area) => {
        expect(Area.name).toBe('name');
        expect(Area.description).toBe('description');
      });
  });

  it('update', async () => {
    await factory
      .create()
      .then(
        async (Area) =>
          await resolver.update(
            Area.id,
            {
              ...Area,
              ...{ name: 'new name', description: 'new description' },
            },
            {
              id: Area.id,
            },
          ),
      )
      .then(async (Area) => {
        expect(Area.name).toBe('new name');
        expect(Area.description).toBe('new description');
      });
  });

  it('delete', async () => {
    await factory.create().then(async (Area) => {
      await resolver
        .delete(Area.id, {
          id: Area.id,
        })
        .then((deleteResult) => expect(deleteResult).toBe(true));
      await repository
        .findOne({
          where: {
            id: Area.id,
          },
        })
        .then((result) => expect(result).toBe(null));
    });
  });

  it('show', async () => {
    await factory.create({ name: 'admin' }).then(async (Area) => {
      await resolver
        .findOne({ id: Area.id })
        .then((Area) => expect(Area.name).toBe('admin'));
    });
  });

  afterAll(() => app.close());
});
