import { Test, TestingModule } from '@nestjs/testing';
import { PosCheckService } from './pos-check.service';

describe('PosCheckService', () => {
  let service: PosCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PosCheckService],
    }).compile();

    service = module.get<PosCheckService>(PosCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
