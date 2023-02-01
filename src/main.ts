import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // await app.listen(3000);
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}
bootstrap();
