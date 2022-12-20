import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TailorEntities } from '@components/users/entities/tailor.entities';
import { UserImagesEntities } from '@components/users/entities/user-images.entities';
import { UserImagesTypeEnum } from '@components/users/enums/user-images-type.enum';
import { TailorServiceEntities } from '@components/users/entities/tailor-service.entities';
import { TailorMaterialsEntities } from '@components/users/entities/tailor-materials.entities';
import { TailorPriceEntities } from '@components/users/entities/tailor-price.entities';
import {
  Images,
  Materials,
  Services,
  SignupTailorRequest,
} from '@components/authentication/dto/request/signup-tailor-request';
import { Transaction } from 'sequelize';
import { UserEntities } from '@components/users/entities/user.entities';

@Injectable()
export class TailorsAdapter {
  constructor(
    @InjectModel(UserEntities)
    private readonly usersModel: typeof UserEntities,
    @InjectModel(TailorEntities)
    private readonly tailorModel: typeof TailorEntities,
    @InjectModel(UserImagesEntities)
    private readonly userImagesModel: typeof UserImagesEntities,
    @InjectModel(TailorServiceEntities)
    private readonly tailorServiceModel: typeof TailorServiceEntities,
    @InjectModel(TailorMaterialsEntities)
    private readonly tailorMaterialsModel: typeof TailorMaterialsEntities,
  ) {}

  async manageTailor(
    body: SignupTailorRequest,
    userId: string,
    t: Transaction,
  ) {
    const createTailor = await this.createTailor(body, userId, t);
    await this.saveImages(body.images, userId, t);
    await this.usersModel.update(
      { tailorId: createTailor.id },
      { where: { id: userId }, transaction: t },
    );
    await this.saveTailorService(body.services, createTailor.id, t);
    await this.saveTailorMaterials(body.materialsPrice, createTailor.id, t);

    return createTailor;
  }

  async createTailor(
    body: SignupTailorRequest,
    userId: string,
    t: Transaction,
  ): Promise<TailorEntities> {
    const { businessName, address } = body;

    return this.tailorModel.create(
      {
        businessName,
        address,
        userId,
        paymentPlan: body.services[0].subscriptionId,
      },
      { transaction: t },
    );
  }

  async saveImages(
    images: Images,
    userId: string,
    t: Transaction,
  ): Promise<void> {
    const data = images.previousImgWork.map((el) => {
      return {
        link: el,
        type: UserImagesTypeEnum.PREVIOUSIMGWORK,
        userId,
      };
    });
    await this.userImagesModel.bulkCreate(
      [
        ...data,
        ...[{ link: images.coverImg, type: UserImagesTypeEnum.COVER, userId }],
      ],
      { transaction: t },
    );
  }

  async saveTailorService(
    services: Services[],
    tailorId: string,
    t: Transaction,
  ): Promise<void> {
    await Promise.all(
      services.map((el) =>
        this.tailorServiceModel.create(
          { ...el, tailorId },
          { include: TailorPriceEntities, transaction: t },
        ),
      ),
    );
  }

  async saveTailorMaterials(
    tailorMaterials: Materials[],
    tailorId: string,
    t: Transaction,
  ): Promise<void> {
    const saveMaterialTailor = tailorMaterials.map((el) => {
      return {
        materialId: el.materialId,
        percentage: el.percentage,
        tailorId,
      };
    });

    await this.tailorMaterialsModel.bulkCreate(saveMaterialTailor, {
      transaction: t,
    });
  }
}
