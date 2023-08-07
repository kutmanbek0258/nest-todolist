import { Test, TestingModule } from '@nestjs/testing';
import { PriceTemplateService } from './price-template.service';

describe('PriceTemplateService', () => {
  let service: PriceTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceTemplateService],
    }).compile();

    service = module.get<PriceTemplateService>(PriceTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
