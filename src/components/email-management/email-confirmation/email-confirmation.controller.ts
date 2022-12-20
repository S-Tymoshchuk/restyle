import { Body, Controller, Post } from '@nestjs/common';
import { EmailConfirmationService } from '@components/email-management/email-confirmation/email-confirmation.service';
import { ApiTags } from '@nestjs/swagger';
import { EMAIL_CONFIRMATION_TAG } from '@docs/tags';
import { EMAIL_CONFIRMATION_PATH } from '@docs/path';
import { ConfirmEmailRequest } from '@components/email-management/email-confirmation/dto/request/confirm-email-request';
import { AuthJWT } from '@decorators/auth-jwt.decorator';
import { User } from '@decorators/user.decorator';
import { IReqUser } from '@decorators/auth.user.data';

@ApiTags(EMAIL_CONFIRMATION_TAG)
@Controller(EMAIL_CONFIRMATION_PATH)
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Post('confirm')
  async confirm(@Body() confirmationData: ConfirmEmailRequest) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      confirmationData.token,
    );

    await this.emailConfirmationService.confirmEmail(email);
  }

  @AuthJWT()
  @Post('resend-confirmation-link')
  async resendConfirmationLink(@User() user: IReqUser) {
    await this.emailConfirmationService.resendConfirmationLink(user.id);
  }
}
