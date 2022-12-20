import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { S3Client } from '@utils/s3/s3.client';
import { UploadResponseInterface } from '@components/tailor/dto/response/upload-response-interface';
import { TailorRepository } from '@components/tailor/tailor.repository';
import { loggerMessages } from '@constants/logger.messages';
import { UserImagesTypeEnum } from '@components/users/enums/user-images-type.enum';

@Injectable()
export class TailorService {
  private readonly logger = new Logger(TailorService.name);
  constructor(
    private readonly s3Service: S3Client,
    private readonly tailorRepository: TailorRepository,
  ) {}

  async uploadFiles(
    files: Express.Multer.File[],
    key: string,
    userId = '',
  ): Promise<UploadResponseInterface[]> {
    return Promise.all(
      files.map(
        async (el: Express.Multer.File, i: number) =>
          await this.s3Service.uploadPublicFile(key + i + userId, el.buffer),
      ),
    );
  }

  async updateImages(
    files: Express.Multer.File[],
    key: string,
    userId: string,
  ) {
    if (key === UserImagesTypeEnum.COVER && files.length > 1) {
      throw new BadRequestException('Cover should only be one file');
    }

    const checkUser = await this.tailorRepository.checkUser(userId);
    this.logger.log(loggerMessages.checkUser(userId), checkUser);

    if (!checkUser) {
      throw new NotFoundException('User not found');
    }
    const filesUpload = await this.uploadFiles(files, key, userId);
    this.logger.log('Tailors img', filesUpload);

    const filesForTailor = filesUpload.map((el) => ({
      link: el.link,
      type: key,
      userId,
    }));

    this.logger.log(loggerMessages.generatedData(), filesForTailor);

    return this.tailorRepository.saveImagesForDb(filesForTailor, userId, key);
  }
}
