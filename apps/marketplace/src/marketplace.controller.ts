import { Controller, Get } from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';

@Controller()
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Get()
  getHello(): string {
    return this.marketplaceService.getHello();
  }
}
