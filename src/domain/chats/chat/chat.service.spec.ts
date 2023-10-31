import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { AppModule } from 'src/app.module';
import { INestApplication } from '@nestjs/common';

describe('ChatsService', () => {
  let app: INestApplication;
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    service = module.get<ChatService>(ChatService);

    app.init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(() => app.close);
});
