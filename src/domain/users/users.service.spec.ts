import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let app: INestApplication;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    service = module.get<UsersService>(UsersService);

    app.init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(() => app.close);
});
