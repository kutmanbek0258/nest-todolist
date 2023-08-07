import { Test, TestingModule } from '@nestjs/testing';
import { NMailerService } from './n-mailer.service';

describe('NmailerService', () => {
  let service: NMailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NMailerService],
    }).compile();

    service = module.get<NMailerService>(NMailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
