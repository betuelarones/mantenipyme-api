import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const allowedOrigins = process.env.FRONTEND_URL?.split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);
    app.enableCors({
        origin: allowedOrigins?.length ? allowedOrigins : true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(Number(process.env.PORT ?? 3000), '0.0.0.0');
}
await bootstrap();
//# sourceMappingURL=main.js.map