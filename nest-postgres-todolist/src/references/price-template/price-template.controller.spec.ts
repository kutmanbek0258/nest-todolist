import { Test, TestingModule } from '@nestjs/testing';
import { PriceTemplateController } from './price-template.controller';
import { PriceTemplateService } from './price-template.service';

describe('PriceTemplateController', () => {
  let controller: PriceTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceTemplateController],
      providers: [PriceTemplateService],
    }).compile();

    controller = module.get<PriceTemplateController>(PriceTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
