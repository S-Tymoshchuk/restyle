import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '@components/users/users.repository';
import { UserDbDto } from '@components/users/dto/user.dto';
import { UserEntities } from '@components/users/entities/user.entities';
import { CryptoService } from '@utils/crypto/crypto.service';
import { CreateUserMapper } from '@components/users/mappers/create-user.mapper';
import { RegistrationRequest } from '@components/authentication/dto/request/registration-user-request';
import { TailorsAdapter } from '@components/users/tailors.adapter';
import { Sequelize } from 'sequelize-typescript';
import {
  Services,
  SignupTailorRequest,
} from '@components/authentication/dto/request/signup-tailor-request';
import { TailorEntities } from '@components/users/entities/tailor.entities';
import { UserSearchRequest } from '@components/users/dto/request/user-search-request';
import { TailorBusinessUpdateRequest } from '@components/users/dto/request/tailor-business-update-request';
import { loggerMessages } from '@constants/logger.messages';
import { Transaction } from 'sequelize';
import { GetProfileUserResponse } from '@components/users/dto/response/get-profile-user.response';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly cryptoService: CryptoService,
    private readonly tailorsAdapter: TailorsAdapter,
    private sequelize: Sequelize,
  ) {}

  createUser(
    registrationData: RegistrationRequest,
    t?: Transaction,
  ): Promise<UserDbDto> {
    return this.usersRepository.createUser(registrationData, t);
  }

  getUserByEmail(email: string): Promise<UserEntities> {
    return this.usersRepository.getUserByEmail(email);
  }

  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: string,
  ): Promise<UserDbDto> {
    try {
      const user = await this.usersRepository.getUserById(userId);
      this.logger.log(loggerMessages.get('user'), user);
      this.logger.log('Verify token', user);
      await this.verifyToken(refreshToken, user.credentials.refreshToken);
      return CreateUserMapper.CreateUserMapperResponse(user);
    } catch (error) {
      throw new UnauthorizedException('User not found');
    }
  }

  private async verifyToken(
    plainTextToken: string,
    hashedPassword: string,
  ): Promise<void> {
    const isPasswordMatching = await this.cryptoService.verifyPassword(
      hashedPassword,
      plainTextToken,
    );
    this.logger.log('Password matching', isPasswordMatching);

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong jwt token provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUserById(userId: string): Promise<UserDbDto> {
    this.logger.log(loggerMessages.get('user'), userId);
    const user = await this.usersRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return CreateUserMapper.AuthresponseUser(user);
  }

  async createTailor(body: SignupTailorRequest): Promise<{
    tailor: TailorEntities;
    user: UserDbDto;
  }> {
    const { firstName, lastName, email, phone, password } = body;
    this.logger.log(loggerMessages.transaction());
    return this.sequelize.transaction(async (t) => {
      const createUser = await this.createUser({
        firstName,
        lastName,
        email,
        phone,
        password,
      });
      this.logger.log(loggerMessages.create('user'), createUser);
      return {
        tailor: await this.tailorsAdapter.manageTailor(body, createUser.id, t),
        user: createUser,
      };
    });
  }

  getUserMe(
    userId: string,
  ): Promise<GetProfileUserResponse | Record<string, unknown>> {
    return this.usersRepository.getUserMe(userId);
  }

  getById(userId: string): Promise<UserEntities> {
    return this.usersRepository.getUserById(userId);
  }

  async markEmailAsConfirmed(email: string): Promise<void> {
    await this.usersRepository.markEmailAsConfirmed(email);
  }

  getTailorsBySearch(body: UserSearchRequest): Promise<UserEntities[]> {
    return this.usersRepository.getFilterUser(body);
  }

  async updateTailorBusiness(
    tailorBusiness: TailorBusinessUpdateRequest,
    userId: string,
  ): Promise<void> {
    const tailor = await this.usersRepository.getUserById(userId);
    if (!tailor) {
      throw new NotFoundException('Tailor not found');
    }
    await this.usersRepository.updateTailorBusiness(
      tailor.tailorId,
      tailorBusiness,
    );
  }

  async updateTailorService(
    userId: string,
    services: Services[],
  ): Promise<void> {
    return this.sequelize.transaction(async (t) => {
      const tailor = await this.usersRepository.getUserById(userId);

      if (!tailor.tailorId) {
        throw new NotFoundException('Tailor not found');
      }
      const tailorService = await this.usersRepository.tailorService(
        tailor.tailorId,
      );
      await this.usersRepository.removeTailorServices(tailorService.id, t);
      await this.usersRepository.updateTailorService(
        services,
        tailor.tailorId,
        t,
      );
    });
  }
}
