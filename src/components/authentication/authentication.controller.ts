import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from '@components/authentication/authentication.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserDbDto } from '@components/users/dto/user.dto';
import { LocalAuthenticationGuard } from '@components/authentication/guards/local-authentication.guard';
import { Req } from '@nestjs/common';
import { RequestWithUser } from '@components/authentication/dto/request/request-with-user.interface';
import { AUTH_TAG } from '@docs/tags';
import { AUTH_PATH } from '@docs/path';
import { JwtRefreshGuard } from '@components/authentication/guards/jwt-authentication-refresh.guard';
import { RefreshTokenResponse } from '@components/users/dto/response/refresh-token-response';
import { LoginResponse } from '@components/users/dto/response/login-response';
import { CreateUserResponse } from '@components/users/dto/response/create-user-response';
import { RegistrationRequest } from '@components/authentication/dto/request/registration-user-request';
import { AbstractUserRequest } from '@components/authentication/dto/request/abstract-user-request';
import { SignupTailorRequest } from '@components/authentication/dto/request/signup-tailor-request';
import { loggerMessages } from '@constants/logger.messages';
import { CheckEmailRequest } from '@components/authentication/dto/request/check-email-request';

@ApiTags(AUTH_TAG)
@Controller(AUTH_PATH)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  private readonly logger = new Logger(AuthenticationController.name);

  @ApiCreatedResponse({ type: CreateUserResponse })
  @Post('user/signup')
  register(@Body() registrationData: RegistrationRequest): Promise<UserDbDto> {
    this.logger.log(loggerMessages.signUp('user'), registrationData);
    return this.authenticationService.register(registrationData);
  }

  @Post('tailor/signup')
  signUpTailor(@Body() body: SignupTailorRequest) {
    this.logger.log(loggerMessages.signUp('tailor'), body);
    return this.authenticationService.tailorSignUp(body);
  }

  @Post('login')
  @ApiCreatedResponse({ type: LoginResponse })
  @ApiBody({ type: AbstractUserRequest })
  @UseGuards(LocalAuthenticationGuard)
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    this.logger.log(loggerMessages.login('user'), user);
    if (!user.isEmailConfirmed) {
      throw new ForbiddenException('The account is not verified');
    }
    return this.authenticationService.getJwtAccessToken(user, user.tailorId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @ApiOkResponse({ type: RefreshTokenResponse })
  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  refresh(@Req() request: RequestWithUser) {
    const { user } = request;
    this.logger.log(loggerMessages.check('refresh'), user);
    return this.authenticationService.getJwtAccessToken(user);
  }

  @Post('check-email')
  checkEmail(@Body() body: CheckEmailRequest) {
    return this.authenticationService.checkEmail(body.email);
  }
}
