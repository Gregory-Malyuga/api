import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { ChatService as Service } from './chat.service';

describe('ChatService', () => {
  let app: INestApplication;
  let service: Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    service = module.get<Service>(Service);

    app.init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(() => app.close);
});
