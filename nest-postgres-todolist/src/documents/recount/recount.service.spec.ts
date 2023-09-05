import { Test, TestingModule } from '@nestjs/testing';
import { RecountService } from './recount.service';

describe('RecountService', () => {
  let service: RecountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecountService],
    }).compile();

    service = module.get<RecountService>(RecountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
