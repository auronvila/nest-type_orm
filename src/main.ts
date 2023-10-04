import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { setupSwagger } from "./swagger/swagger";
const cookieSesion = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSesion({
    keys:['asdasd']
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );
  setupSwagger(app);
  await app.listen(3000);
}

bootstrap();
