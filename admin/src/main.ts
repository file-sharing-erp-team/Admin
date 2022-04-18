import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Административный сервер')
        .setDescription(
            'Документация REST API для работы с административным сервером',
        )
        .setVersion('1.0.0')
        .addTag('MYuToropchinov')
        .addServer('http://localhost:7000/ecosystem')
        .addServer('http://localhost:7000/ecosystem-admin/docs/')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`/ecosystem-admin/docs`, app, document);

    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

void start();
