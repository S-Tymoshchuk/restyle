import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RESET_PASSWORD_TAG } from '@docs/tags';
import { EMAIL_RESET_PASSWORD } from '@docs/path';
import { ResetPasswordService } from '@components/email-management/reset-password/reset-password.service';
import { ResetPasswordRequest } from '@components/email-management/reset-password/dto/reset-password.request';
import { ChangePasswordRequest } from '@components/email-management/reset-password/dto/change-password.request';

@ApiTags(RESET_PASSWORD_TAG)
@Controller(EMAIL_RESET_PASSWORD)
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post()
  resetPassword(@Body() body: ResetPasswordRequest) {
    return this.resetPasswordService.resetPassword(body.email);
  }

  @Post('change-password')
  changePassword(@Body() body: ChangePasswordRequest) {
    return this.resetPasswordService.changePassword(body);
  }
}
