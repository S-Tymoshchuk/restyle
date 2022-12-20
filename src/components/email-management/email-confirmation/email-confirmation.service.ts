import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@components/users/users.service';
import { VerificationTokenPayload } from '@components/email-management/email-confirmation/dto/verification-token-payload-interface';
import { SesClient } from '@components/email-management/ses/ses.client';
import { Transaction } from 'sequelize';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly sesClient: SesClient,
  ) {}

  async sendVerificationLink(
    email: string,
    property: string,
    t?: Transaction,
  ): Promise<void> {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    const confirmUrl = `${this.configService.get(
      'EMAIL_CONFIRMATION_URL',
    )}?token=${token}`;

    const resetUrl = `${this.configService.get(
      'EMAIL_RESET_URL',
    )}?token=${token}`;

    const templateEmail = {
      confirmText: `Welcome to the application. To confirm the email address, click here: ${confirmUrl}`,
      resetText: `Reset password, click here: ${resetUrl}`,
    };

    await this.sesClient.sendEmail(email, 'test', templateEmail[property], t);
  }

  async resendConfirmationLink(userId: string): Promise<void> {
    const user = await this.usersService.getById(userId);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.sendVerificationLink(user.email, 'confirmText');
  }

  async confirmEmail(email: string): Promise<void> {
    const user = await this.usersService.getUserByEmail(email);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.usersService.markEmailAsConfirmed(email);
  }

  async decodeConfirmationToken(token: string): Promise<string> {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email token expired');
      }
      throw new BadRequestException('Bad token');
    }
  }
}
