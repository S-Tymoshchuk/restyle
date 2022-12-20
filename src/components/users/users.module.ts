import { Module } from '@nestjs/common';
import { UsersService } from '@components/users/users.service';
import { UsersController } from '@components/users/users.controller';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntities } from '@components/users/entities/user.entities';
import { CredentialsEntities } from '@components/authentication/entities/credentials.entities';
import { UsersRepository } from '@components/users/users.repository';
import { CryptoService } from '@utils/crypto/crypto.service';
import { TailorsAdapter } from '@components/users/tailors.adapter';
import { TailorEntities } from '@components/users/entities/tailor.entities';
import { UserImagesEntities } from '@components/users/entities/user-images.entities';
import { TailorServiceEntities } from '@components/users/entities/tailor-service.entities';
import { TailorMaterialsEntities } from '@components/users/entities/tailor-materials.entities';

@Module({
  imports: [
    SequelizeModule.forFeature([
      UserEntities,
      CredentialsEntities,
      TailorEntities,
      UserImagesEntities,
      TailorServiceEntities,
      TailorMaterialsEntities,
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    ConfigService,
    UsersRepository,
    CryptoService,
    TailorsAdapter,
  ],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
