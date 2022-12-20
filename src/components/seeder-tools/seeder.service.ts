import { Injectable, Logger } from '@nestjs/common';
import { SeederRepository } from '@components/seeder-tools/seeder.repository';
import { MaterialsMock } from '@components/seeder-tools/mock/materials/materials.mock';
import { Sequelize } from 'sequelize-typescript';
import { ClothingItemMock } from '@components/seeder-tools/mock/clothing-item/clothing-item.mock';
import { ServicesMock } from '@components/seeder-tools/mock/services/services.mock';
import { MaterialsEntities } from '@components/seeder-tools/entities/materials.entities';
import { ClothingItemsEntities } from '@components/seeder-tools/entities/clothing-items.entities';
import { ServicesEntities } from '@components/seeder-tools/entities/service.entities';
import { ServicesTypeMock } from '@components/seeder-tools/mock/services/services-type.mock';
import { ServicesTypeEntities } from '@components/seeder-tools/entities/service-type.entities';
import { ReviewsAnswerMock } from '@components/seeder-tools/mock/review-answers/review-answers.mock';

@Injectable()
export class SeederService {
  private readonly logger = new Logger('SeederService');

  constructor(
    private readonly seederRepository: SeederRepository,
    private sequelize: Sequelize,
  ) {}

  async seederTools(): Promise<void> {
    return this.sequelize.transaction(async (t) => {
      const checkToolsForApp = await this.seederRepository.checkToolsForApp();
      if (!checkToolsForApp) {
        await this.seederRepository.seedMaterials(MaterialsMock, t);
        await this.seederRepository.seedClotheItems(ClothingItemMock, t);
        await this.seederRepository.seedServices(ServicesMock, t);
        await this.seederRepository.seedTypeServices(ServicesTypeMock, t);
        await this.seederRepository.seedReviewAnswers(ReviewsAnswerMock, t);
      }
      this.logger.log('AppTools is mock');
    });
  }

  getMaterials(): Promise<MaterialsEntities[]> {
    return this.seederRepository.getMaterials();
  }

  getClothingItems(): Promise<ClothingItemsEntities[]> {
    return this.seederRepository.getClothingItems();
  }

  getServices(): Promise<ServicesEntities[]> {
    return this.seederRepository.getServices();
  }

  getTypeServices(): Promise<ServicesTypeEntities[]> {
    return this.seederRepository.getTypeServices();
  }
}
