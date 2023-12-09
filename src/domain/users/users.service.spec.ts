import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { UsersService as Service } from './users.service';

describe('UsersService', () => {
  let app: INestApplication;
  let service: Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    service = module.get<Service>(Service);

    await app.init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(() => app.close);
});
