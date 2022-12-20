import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';
import { UploadResponseInterface } from '@components/tailor/dto/response/upload-response-interface';

export class UploadMapperResponse {
  static mapToResponseUpload(
    uploadObject: ManagedUpload.SendData,
  ): UploadResponseInterface {
    return uploadObject
      ? {
          link: uploadObject.Location,
        }
      : null;
  }
}
