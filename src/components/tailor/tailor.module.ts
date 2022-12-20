import { Module } from '@nestjs/common';
import { TailorController } from '@components/tailor/tailor.controller';
import { TailorService } from '@components/tailor/tailor.service';
import { S3Client } from '@utils/s3/s3.client';
import { TailorRepository } from '@components/tailor/tailor.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserImagesEntities } from '@components/users/entities/user-images.entities';
import { UserEntities } from '@components/users/entities/user.entities';

@Module({
  imports: [SequelizeModule.forFeature([UserImagesEntities, UserEntities])],
  controllers: [TailorController],
  providers: [TailorService, TailorRepository, S3Client],
  exports: [],
})
export class TailorModule {}
