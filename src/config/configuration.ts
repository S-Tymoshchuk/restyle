export interface AwsConfig {
  defaultRegion: string;
  secretAccessKey: string;
  accessKeyId: string;
  bucketName: string;
}

export interface ServerConfig {
  port: number;
  environment: string;
  baseUrl: string;
}

export interface JwtConfig {
  jwtAccessTokenSecret: string;
  jwtRefreshTokenSecret: string;
  jwtAccessTokenExpirationTime: string;
  jwtRefreshTokenExpirationTime: string;
}

export interface Sequelize {
  pgHost: string;
  pgUser: string;
  pgPort: string;
  pgBase: string;
  pgPass: string;
}

export interface Swagger {
  docsSwaggerTitle: string;
  docsSwaggerDescription: string;
  docsSwaggerVersion: string;
}

export interface Configuration {
  server: ServerConfig;
  aws: AwsConfig;
  jwt: JwtConfig;
  sequelize: Sequelize;
  swagger: Swagger;
}

export default (): Configuration => ({
  server: {
    baseUrl: process.env.BASE_URL,
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT),
  },
  aws: {
    defaultRegion: process.env.AWS_DEFAULT_REGION,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    bucketName: process.env.AWS_PUBLIC_BUCKET_NAME,
  },
  jwt: {
    jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    jwtAccessTokenExpirationTime: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    jwtRefreshTokenExpirationTime:
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  },
  sequelize: {
    pgHost: process.env.PG_HOST,
    pgUser: process.env.PG_USER,
    pgPort: process.env.PG_PORT,
    pgBase: process.env.PG_BASE,
    pgPass: process.env.PG_PASS,
  },
  swagger: {
    docsSwaggerTitle: process.env.DOCS_SWAGGER_TITLE,
    docsSwaggerDescription: process.env.DOCS_SWAGGER_DESCRIPTION,
    docsSwaggerVersion: process.env.DOCS_SWAGGER_VERSION,
  },
});
