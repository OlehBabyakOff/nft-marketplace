import { Test, TestingModule } from '@nestjs/testing';
import { MarketplaceController } from './marketplace.controller';
import { MarketplaceService } from './marketplace.service';

describe('MarketplaceController', () => {
  let marketplaceController: MarketplaceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MarketplaceController],
      providers: [MarketplaceService],
    }).compile();

    marketplaceController = app.get<MarketplaceController>(MarketplaceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(marketplaceController.getHello()).toBe('Hello World!');
    });
  });
});
