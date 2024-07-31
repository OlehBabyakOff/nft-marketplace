import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketplaceService {
  getHello(): string {
    return 'Hello World!';
  }
}
