import { Test, TestingModule } from '@nestjs/testing';
import { WriteOffService } from './write-off.service';

describe('WriteOffService', () => {
  let service: WriteOffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WriteOffService],
    }).compile();

    service = module.get<WriteOffService>(WriteOffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
