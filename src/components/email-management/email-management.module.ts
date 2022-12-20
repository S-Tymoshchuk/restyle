import { Module } from '@nestjs/common';
import { EmailConfirmationService } from '@components/email-management/email-confirmation/email-confirmation.service';
import { AuthenticationModule } from '@components/authentication/authentication.module';
import { EmailConfirmationController } from '@components/email-management/email-confirmation/email-confirmation.controller';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '@components/users/users.module';
import { ResetPasswordController } from '@components/email-management/reset-password/reset-password.controller';
import { ResetPasswordService } from '@components/email-management/reset-password/reset-password.service';
import { CryptoService } from '@utils/crypto/crypto.service';
import { SesClient } from '@components/email-management/ses/ses.client';

@Module({
  imports: [AuthenticationModule, UsersModule],
  controllers: [EmailConfirmationController, ResetPasswordController],
  providers: [
    EmailConfirmationService,
    JwtService,
    ResetPasswordService,
    CryptoService,
    SesClient,
  ],
  exports: [EmailConfirmationService],
})
export class EmailManagementModule {}
