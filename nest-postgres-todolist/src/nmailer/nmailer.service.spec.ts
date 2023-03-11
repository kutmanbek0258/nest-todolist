import { Test, TestingModule } from '@nestjs/testing';
import { NmailerService } from './nmailer.service';

describe('NmailerService', () => {
  let service: NmailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NmailerService],
    }).compile();

    service = module.get<NmailerService>(NmailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
