import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MaterialsEntities } from '@components/seeder-tools/entities/materials.entities';
import { MaterialsInterface } from '@components/seeder-tools/mock/materials/materials.interface';
import { Transaction } from 'sequelize';
import { ClothingItemInterface } from '@components/seeder-tools/mock/clothing-item/clothing-item.interface';
import { ClothingItemsEntities } from '@components/seeder-tools/entities/clothing-items.entities';
import { ServicesEntities } from '@components/seeder-tools/entities/service.entities';
import { ServicesInterface } from '@components/seeder-tools/mock/services/services.interface';
import { ServicesTypeInterface } from '@components/seeder-tools/mock/services/services-type.interface';
import { ServicesTypeEntities } from '@components/seeder-tools/entities/service-type.entities';
import { ReviewAnswersEntities } from '@components/seeder-tools/entities/review-answers.entities';
import { ReviewsInterface } from '@components/seeder-tools/mock/review-answers/reviews-answers.interface';

@Injectable()
export class SeederRepository {
  constructor(
    @InjectModel(MaterialsEntities)
    private readonly materialsModel: typeof MaterialsEntities,
    @InjectModel(ClothingItemsEntities)
    private readonly clothingItemsModel: typeof ClothingItemsEntities,
    @InjectModel(ServicesEntities)
    private readonly servicesModel: typeof ServicesEntities,
    @InjectModel(ServicesTypeEntities)
    private readonly servicesTypeModel: typeof ServicesTypeEntities,
    @InjectModel(ReviewAnswersEntities)
    private readonly reviewAnswersModel: typeof ReviewAnswersEntities,
  ) {}
  checkToolsForApp(): Promise<number> {
    return this.materialsModel.count();
  }

  async seedMaterials(
    materials: MaterialsInterface[],
    t: Transaction,
  ): Promise<void> {
    await this.materialsModel.bulkCreate(materials, { transaction: t });
  }

  async seedClotheItems(
    clotheItems: ClothingItemInterface[],
    t: Transaction,
  ): Promise<void> {
    await this.clothingItemsModel.bulkCreate(clotheItems, { transaction: t });
  }

  async seedServices(
    servicesMock: ServicesInterface[],
    t: Transaction,
  ): Promise<void> {
    await this.servicesModel.bulkCreate(servicesMock, { transaction: t });
  }

  async seedTypeServices(
    servicesMock: ServicesTypeInterface[],
    t: Transaction,
  ): Promise<void> {
    await this.servicesTypeModel.bulkCreate(servicesMock, { transaction: t });
  }

  async seedReviewAnswers(reviewAnswers: ReviewsInterface[], t: Transaction) {
    await this.reviewAnswersModel.bulkCreate(reviewAnswers, { transaction: t });
  }

  getMaterials(): Promise<MaterialsEntities[]> {
    return this.materialsModel.findAll();
  }

  getClothingItems(): Promise<ClothingItemsEntities[]> {
    return this.clothingItemsModel.findAll();
  }

  getServices(): Promise<ServicesEntities[]> {
    return this.servicesModel.findAll();
  }

  getTypeServices(): Promise<ServicesTypeEntities[]> {
    return this.servicesTypeModel.findAll();
  }
}
