import { Test, TestingModule } from '@nestjs/testing';
import { RecountController } from './recount.controller';
import { RecountService } from './recount.service';

describe('RecountController', () => {
  let controller: RecountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecountController],
      providers: [RecountService],
    }).compile();

    controller = module.get<RecountController>(RecountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
