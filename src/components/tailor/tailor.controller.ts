import {
  Controller,
  Logger,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { TAILOR_TAG } from '@docs/tags';
import { TAILOR_PATH } from '@docs/path';
import { TailorService } from '@components/tailor/tailor.service';
import { ApiMultiFile } from '@decorators/api-multi-part.decorator';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { UploadKeyRequest } from '@components/tailor/dto/request/upload-key-request';
import { loggerMessages } from '@constants/logger.messages';
import { AuthJWT } from '@decorators/auth-jwt.decorator';
import { User } from '@decorators/user.decorator';
import { IReqUser } from '@decorators/auth.user.data';

@ApiTags(TAILOR_TAG)
@Controller(TAILOR_PATH)
export class TailorController {
  private readonly logger = new Logger(TailorController.name);

  constructor(private readonly tailorService: TailorService) {}

  @Post('upload/:key')
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile()
  @UseInterceptors(AnyFilesInterceptor())
  uploadImg(
    @UploadedFiles() files: Express.Multer.File[],
    @Param() { key }: UploadKeyRequest,
  ) {
    this.logger.log(loggerMessages.upload(key));
    return this.tailorService.uploadFiles(
      files,
      key,
      String(new Date().valueOf()),
    );
  }

  @AuthJWT()
  @Patch('upload/:key')
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile()
  @UseInterceptors(AnyFilesInterceptor())
  updateImg(
    @UploadedFiles() files: Express.Multer.File[],
    @Param() { key }: UploadKeyRequest,
    @User() user: IReqUser,
  ) {
    this.logger.log(loggerMessages.updateImage(key), user);
    return this.tailorService.updateImages(files, key, user.id);
  }
}
