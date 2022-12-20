import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AuthenticationRepository } from '@components/authentication/authentication.repository';
import { UsersService } from '@components/users/users.service';
import { CryptoService } from '@utils/crypto/crypto.service';
import { UserDbDto } from '@components/users/dto/user.dto';
import { TokenPayload } from '@components/authentication/dto/token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserMapper } from '@components/users/mappers/create-user.mapper';
import { RegistrationRequest } from '@components/authentication/dto/request/registration-user-request';
import { SignupTailorRequest } from '@components/authentication/dto/request/signup-tailor-request';
import { TailorEntities } from '@components/users/entities/tailor.entities';
import { EmailConfirmationService } from '@components/email-management/email-confirmation/email-confirmation.service';
import { loggerMessages } from '@constants/logger.messages';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailConfirmationService: EmailConfirmationService,
    private sequelize: Sequelize,
  ) {}

  async register(registrationData: RegistrationRequest): Promise<UserDbDto> {
    const hashPassword = await this.cryptoService.hashPassword(
      registrationData.password,
    );

    this.logger.log(loggerMessages.generate('password'));
    return this.sequelize.transaction(async (t) => {
      const user = await this.usersService.createUser(
        {
          ...registrationData,
          password: hashPassword,
        },
        t,
      );

      this.logger.log(loggerMessages.create('user'), user);

      if (user) {
        await this.emailConfirmationService.sendVerificationLink(
          user.email,
          'confirmText',
          t,
        );

        this.logger.log(loggerMessages.sendVerLink('link'), user.email);
        return user;
      }
    });
  }

  public async getJwtAccessToken(
    user: UserDbDto,
    tailorId?: null | string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    isTailor: boolean;
  }> {
    const payload: TokenPayload = { userId: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    this.logger.log(loggerMessages.generate('accessToken'), accessToken);
    const refreshToken = await this.getJwtRefreshToken(
      user.id,
      user.credentialId,
    );
    this.logger.log(loggerMessages.generate('refreshToken'), refreshToken);
    return { ...user, accessToken, refreshToken, isTailor: Boolean(tailorId) };
  }

  public async getJwtRefreshToken(
    userId: string,
    credentialId: number,
  ): Promise<string> {
    const payload: TokenPayload = { userId };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    const hashedToken = await this.cryptoService.hashPassword(refreshToken);

    await this.authenticationRepository.updateRefreshToken(
      credentialId,
      hashedToken,
    );
    return refreshToken;
  }

  async getAuthenticatedUser(
    email: string,
    plainTextPassword: string,
  ): Promise<UserDbDto> {
    const user = await this.usersService.getUserByEmail(email);

    if (
      !user ||
      !(await this.cryptoService.verifyPassword(
        user.credentials.password,
        plainTextPassword,
      ))
    ) {
      throw new BadRequestException('Invalid credentials.');
    }

    return CreateUserMapper.CreateUserMapperResponse(user);
  }

  async tailorSignUp(body: SignupTailorRequest): Promise<TailorEntities> {
    const hashPassword = await this.cryptoService.hashPassword(body.password);

    this.logger.log(loggerMessages.generate('password'));

    const createTailor = await this.usersService.createTailor({
      ...body,
      password: hashPassword,
    });

    this.logger.log(loggerMessages.create('tailor'), createTailor);

    if (createTailor.user) {
      this.logger.log(loggerMessages.sendVerLink(createTailor.user.email));

      await this.emailConfirmationService.sendVerificationLink(
        createTailor.user.email,
        'confirmText',
      );
    }

    const accessAndRefreshToken = await this.getJwtAccessToken(
      createTailor.user,
    );

    this.logger.log(loggerMessages.generate('refresh'), accessAndRefreshToken);

    return {
      ...createTailor.tailor.get({ plain: true }),
      ...accessAndRefreshToken,
    };
  }

  async checkEmail(email: string): Promise<boolean> {
    return Boolean(await this.usersService.getUserByEmail(email));
  }
}
