import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '@components/users/users.service';
import { EmailConfirmationService } from '@components/email-management/email-confirmation/email-confirmation.service';
import { ChangePasswordRequest } from '@components/email-management/reset-password/dto/change-password.request';
import { AuthenticationRepository } from '@components/authentication/authentication.repository';
import { CryptoService } from '@utils/crypto/crypto.service';

@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly cryptoService: CryptoService,
    private readonly authenticationRepository: AuthenticationRepository,
  ) {}

  async resetPassword(email: string): Promise<void> {
    await this.emailConfirmationService.sendVerificationLink(
      email,
      'resetText',
    );
  }

  async changePassword(
    changePassword: ChangePasswordRequest,
  ): Promise<[affectedCount: number]> {
    const userEmail =
      await this.emailConfirmationService.decodeConfirmationToken(
        changePassword.token,
      );

    const checkUser = await this.usersService.getUserByEmail(userEmail);

    if (!checkUser) {
      throw new NotFoundException('User not found');
    }
    const hashPassword = await this.cryptoService.hashPassword(
      changePassword.password,
    );

    return this.authenticationRepository.changePassword(
      hashPassword,
      checkUser.credentials.id,
    );
  }
}
