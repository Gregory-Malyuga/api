import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { AreaService } from './area.service';

describe('AreaService', () => {
  let app: INestApplication;
  let service: AreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    service = module.get<AreaService>(AreaService);

    app.init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(() => app.close);
});
