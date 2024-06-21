import { Test, TestingModule } from '@nestjs/testing';
import { PosCheckController } from './pos-check.controller';
import { PosCheckService } from './pos-check.service';

describe('PosCheckController', () => {
  let controller: PosCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PosCheckController],
      providers: [PosCheckService],
    }).compile();

    controller = module.get<PosCheckController>(PosCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
