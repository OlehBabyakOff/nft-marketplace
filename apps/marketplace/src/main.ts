import { NestFactory } from '@nestjs/core';
import { MarketplaceModule } from './marketplace.module';

async function bootstrap() {
  const app = await NestFactory.create(MarketplaceModule);
  await app.listen(3000);
}
bootstrap();
