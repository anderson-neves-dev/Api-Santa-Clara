import { Test, TestingModule } from '@nestjs/testing';
import { ExameController } from './exame.controller';
import { ExameService } from './exame.service';

describe('ExameController', () => {
  let controller: ExameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExameController],
      providers: [ExameService],
    }).compile();

    controller = module.get<ExameController>(ExameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
