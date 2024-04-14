import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from 'src/app.module';
import { getTestModules } from '../../../test.module';
import { MessageModule as Module } from './message.module';
import { MessageService as Service } from './message.service';

describe('ChatService', () => {
  let app: INestApplication;
  let service: Service;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...getTestModules(),
        TypeOrmModule.forRoot(DatabaseConfig),
        Module,
      ],
    }).compile();

    app = module.createNestApplication();
    service = module.get<Service>(Service);

    await app.init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => await app.close());
});
