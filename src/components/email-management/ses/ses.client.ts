import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AwsConfig } from '@config/configuration';
import { SES } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { Transaction } from 'sequelize';

@Injectable()
export class SesClient {
  private readonly logger = new Logger(SesClient.name);
  private readonly awsConfig: AwsConfig;

  private readonly client: SES;

  constructor(private configService: ConfigService) {
    this.awsConfig = configService.get('aws');

    this.client = new SES({
      accessKeyId: this.awsConfig.accessKeyId,
      secretAccessKey: this.awsConfig.secretAccessKey,
      region: this.awsConfig.defaultRegion,
    });
  }

  async sendEmail(
    email: string,
    name,
    text: string,
    t?: Transaction,
  ): Promise<void> {
    const params = {
      // TODO need then to change email
      Source: 'restyle.liltslink@gmail.com',
      Destination: {
        ToAddresses: ['restyle.liltslink@gmail.com'],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: text,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Hello, ${name}!`,
        },
      },
    };
    try {
      this.logger.log(`Send email from ${'restyle.liltslink@gmail.com'}`);
      await this.client.sendEmail(params).promise();
    } catch (e) {
      await t.rollback();
      this.logger.error(e);
      throw new BadRequestException('Emails have not been sent');
    }
  }
}
