import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MaterialsEntities } from '@components/seeder-tools/entities/materials.entities';
import { ClothingItemsEntities } from '@components/seeder-tools/entities/clothing-items.entities';
import { SeederService } from '@components/seeder-tools/seeder.service';
import { SeederRepository } from '@components/seeder-tools/seeder.repository';
import { ServicesEntities } from '@components/seeder-tools/entities/service.entities';
import { SeederControllers } from '@components/seeder-tools/seeder.controllers';
import { ServicesTypeEntities } from '@components/seeder-tools/entities/service-type.entities';
import { ReviewAnswersEntities } from '@components/seeder-tools/entities/review-answers.entities';

@Module({
  imports: [
    SequelizeModule.forFeature([
      MaterialsEntities,
      ClothingItemsEntities,
      ServicesEntities,
      ServicesTypeEntities,
      ReviewAnswersEntities,
    ]),
  ],
  controllers: [SeederControllers],
  providers: [SeederService, SeederRepository],
})
export class SeederModule implements OnApplicationBootstrap {
  constructor(private readonly seederService: SeederService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seederService.seederTools();
  }
}
