import { Test, TestingModule } from '@nestjs/testing';
import { VenueController } from '../venues/venues.controller';

describe('VenueController', () => {
  let controller: VenueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VenueController],
    }).compile();

    controller = module.get<VenueController>(VenueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
