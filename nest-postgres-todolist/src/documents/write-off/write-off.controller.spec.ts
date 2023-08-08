import { Test, TestingModule } from '@nestjs/testing';
import { WriteOffController } from './write-off.controller';
import { WriteOffService } from './write-off.service';

describe('WriteOffController', () => {
  let controller: WriteOffController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WriteOffController],
      providers: [WriteOffService],
    }).compile();

    controller = module.get<WriteOffController>(WriteOffController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
