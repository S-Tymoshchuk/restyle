import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

import * as tags from '../tags';

function buildDocs(app: INestApplication) {
  const documentBuilder = new DocumentBuilder()
    .addServer('/api')
    .setTitle(process.env.DOCS_SWAGGER_TITLE)
    .setDescription(process.env.DOCS_SWAGGER_DESCRIPTION)
    .setVersion(process.env.DOCS_SWAGGER_VERSION)
    .addBearerAuth();

  Object.values(tags).forEach((tag) => documentBuilder.addTag(tag));

  SwaggerModule.setup(
    'api/docs',
    app,
    SwaggerModule.createDocument(app, documentBuilder.build(), {
      ignoreGlobalPrefix: true,
    }),
    { swaggerOptions: { persistAuthorization: true } },
  );
}

export { buildDocs };
