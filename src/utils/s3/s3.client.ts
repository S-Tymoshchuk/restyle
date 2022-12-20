import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AwsConfig } from '@config/configuration';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { UploadMapperResponse } from '@components/tailor/mapper/upload-mapper-response';
import { UploadResponseInterface } from '@components/tailor/dto/response/upload-response-interface';
import { loggerMessages } from '@constants/logger.messages';

@Injectable()
export class S3Client {
  private readonly logger = new Logger(S3Client.name);
  private readonly awsConfig: AwsConfig;

  private readonly client: S3;

  constructor(private configService: ConfigService) {
    this.awsConfig = configService.get('aws');
    this.client = new S3({
      credentials: {
        accessKeyId: this.awsConfig.accessKeyId,
        secretAccessKey: this.awsConfig.secretAccessKey,
      },
      region: this.awsConfig.defaultRegion,
    });
  }

  async uploadPublicFile(
    key: string,
    body: Buffer,
  ): Promise<UploadResponseInterface> {
    try {
      const param: S3.Types.PutObjectRequest = {
        Bucket: this.awsConfig.bucketName,
        Key: key,
        Body: body,
        ACL: 'public-read',
      };
      this.logger.log(loggerMessages.saveAws(), key);
      return this.client
        .upload(param)
        .promise()
        .then(UploadMapperResponse.mapToResponseUpload);
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException();
    }
  }
}
