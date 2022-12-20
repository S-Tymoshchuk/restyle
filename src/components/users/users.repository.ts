import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntities } from '@components/users/entities/user.entities';
import { InjectModel } from '@nestjs/sequelize';
import { CredentialsEntities } from '@components/authentication/entities/credentials.entities';
import { CreateUserMapper } from '@components/users/mappers/create-user.mapper';
import { UserDbDto } from '@components/users/dto/user.dto';
import { RegistrationRequest } from '@components/authentication/dto/request/registration-user-request';
import { PostgresErrorCode } from '@database/postgresErrorCodes.enum';
import { TailorEntities } from '@components/users/entities/tailor.entities';
import { TailorServiceEntities } from '@components/users/entities/tailor-service.entities';
import { TailorPriceEntities } from '@components/users/entities/tailor-price.entities';
import { TailorMaterialsEntities } from '@components/users/entities/tailor-materials.entities';
import { ClothingItemsEntities } from '@components/seeder-tools/entities/clothing-items.entities';
import { MaterialsEntities } from '@components/seeder-tools/entities/materials.entities';
import { ServicesEntities } from '@components/seeder-tools/entities/service.entities';
import { UserSearchRequest } from '@components/users/dto/request/user-search-request';
import { Op, Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { TailorBusinessUpdateRequest } from '@components/users/dto/request/tailor-business-update-request';
import { Services } from '@components/authentication/dto/request/signup-tailor-request';
import { UserImagesEntities } from '@components/users/entities/user-images.entities';
import { ServicesTypeEntities } from '@components/seeder-tools/entities/service-type.entities';
import { GetUserProfileMapper } from '@components/users/mappers/get-user-profile.mapper';
import { GetProfileUserResponse } from '@components/users/dto/response/get-profile-user.response';
import { ReviewEntities } from '@components/review/entities/review.entities';
import { ReviewOptionsEntities } from '@components/review/entities/review-options.entities';
import { ReviewAnswersEntities } from '@components/seeder-tools/entities/review-answers.entities';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(UserEntities)
    private readonly userModel: typeof UserEntities,
    @InjectModel(TailorServiceEntities)
    private readonly tailorServiceModel: typeof TailorServiceEntities,
    @InjectModel(TailorEntities)
    private readonly tailorEntitiesModel: typeof TailorEntities,
  ) {}

  async createUser(
    registrationData: RegistrationRequest,
    t?: Transaction,
  ): Promise<UserDbDto> {
    const { password } = registrationData;
    try {
      return await this.userModel
        .create(
          {
            password,
            ...registrationData,
            credentials: { password },
          },
          {
            include: [
              {
                model: CredentialsEntities,
              },
            ],
            transaction: t,
          },
        )
        .then((userEntity) =>
          CreateUserMapper.CreateUserMapperResponse(userEntity),
        );
    } catch (e) {
      if (Number(e.parent.code) === Number(PostgresErrorCode.UniqueViolation)) {
        throw new BadRequestException(
          'User already exist, phone or email must be unique',
        );
      }
    }
  }

  getUserByEmail(email: string): Promise<UserEntities> {
    return this.userModel.findOne({
      where: {
        email,
      },
      include: [{ model: CredentialsEntities }],
    });
  }

  getUserById(userId: string): Promise<UserEntities> {
    return this.userModel.findOne({
      where: { id: userId },
      include: [{ model: CredentialsEntities }],
    });
  }

  getUserMe(
    userId: string,
  ): Promise<GetProfileUserResponse | Record<string, unknown>> {
    return this.userModel
      .findOne({
        where: { id: userId },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt', 'credentialsId'],
        },
        include: [
          {
            model: TailorEntities,
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
            include: [
              {
                model: TailorServiceEntities,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [ServicesTypeEntities],
              },
              {
                model: ReviewEntities,
                include: [
                  {
                    model: ReviewOptionsEntities,
                    include: [{ model: ReviewAnswersEntities }],
                  },
                ],
              },
            ],
          },
          { model: UserImagesEntities },
        ],
      })
      .then(GetUserProfileMapper.getUserProfile);
  }

  async markEmailAsConfirmed(email: string): Promise<void> {
    await this.userModel.update(
      { isEmailConfirmed: true },
      { where: { email } },
    );
  }

  async getFilterUser(body: UserSearchRequest): Promise<UserEntities[]> {
    const clothItems = await this.getServiceIdByClothIds(body.clothingItems);

    if (clothItems.length === 0) {
      return [];
    }

    const serviceId = await this.getServiceIdx(body.servicesId, clothItems);
    const tailorsMaterialId = await this.getTailorMaterialIds(body.materialsId);

    try {
      return this.userModel.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt', 'credentialsId'],
        },
        include: [
          {
            model: TailorEntities,
            required: true,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
              {
                model: TailorServiceEntities,
                where: { serviceTypeId: { [Op.in]: body.serviceTypes } },
                required: true,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                  {
                    model: TailorPriceEntities,
                    required: true,
                    where: { tailorServiceId: { [Op.in]: serviceId } },
                    include: [
                      { model: ClothingItemsEntities },
                      { model: ServicesEntities },
                    ],
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                  },
                ],
              },
              {
                model: TailorMaterialsEntities,
                where: { tailorId: { [Op.in]: tailorsMaterialId } },
                required: true,
                include: [
                  {
                    model: MaterialsEntities,
                    required: true,
                  },
                ],
                attributes: {
                  exclude: ['createdAt', 'updatedAt', 'materialId'],
                },
              },
            ],
          },
        ],
      });
    } catch (e) {
      throw new BadRequestException('Service or material not found');
    }
  }

  getServiceIdByClothIds(filterClothItem: number[]): Promise<string[]> {
    try {
      return this.tailorServiceModel
        .findAll({
          where: Sequelize.where(
            Sequelize.literal(
              `(SELECT COUNT(*) FROM tailor_price WHERE "tailor_price"."tailor_service_id"="TailorServiceEntities"."id"
             AND "tailor_price"."clothing_item_id" in (:filter_ids))`,
            ),
            filterClothItem.length,
          ),
          replacements: {
            filter_ids: filterClothItem,
          },
        })

        .then((res) => {
          return res.length > 0 ? res.map((el) => el.id) : [];
        });
    } catch (e) {
      throw new BadRequestException('Cloth items not found');
    }
  }

  getServiceIdx(
    filterService: number[],
    clothItems: string[],
  ): Promise<string[]> {
    try {
      return this.tailorServiceModel
        .findAll({
          where: Sequelize.where(
            Sequelize.literal(
              `(SELECT COUNT(*) FROM tailor_price WHERE "tailor_price"."tailor_service_id"="TailorServiceEntities"."id"
             AND "tailor_price"."tailor_service_id" in (:filter_ids)
             AND "tailor_price"."service_id" in (:filter_service))`,
            ),
            filterService.length,
          ),
          replacements: {
            filter_ids: clothItems,
            filter_service: filterService,
          },
        })
        .then((res) => {
          return res.length > 0 ? res.map((el) => el.id) : [];
        });
    } catch (e) {
      throw new BadRequestException('Services items not found');
    }
  }

  getTailorMaterialIds(filterMaterials: number[]): Promise<string[]> {
    try {
      return this.tailorEntitiesModel
        .findAll({
          where: Sequelize.where(
            Sequelize.literal(
              `(SELECT COUNT(*) FROM tailor_material WHERE "tailor_material"."tailor_id"="TailorEntities"."id"
             AND "tailor_material"."material_id" in (:filter_materialsIds))`,
            ),
            filterMaterials.length,
          ),
          replacements: {
            filter_materialsIds: filterMaterials,
          },
        })
        .then((res) => {
          return res.length > 0 ? res.map((el) => el.id) : [];
        });
    } catch (e) {
      throw new BadRequestException('Materials items not found');
    }
  }

  async updateTailorBusiness(
    tailorId: string,
    tailorBusiness: TailorBusinessUpdateRequest,
  ): Promise<void> {
    await this.tailorServiceModel.update(
      { ...tailorBusiness },
      {
        where: {
          id: tailorId,
        },
      },
    );
  }

  tailorService(tailorId: string): Promise<TailorServiceEntities> {
    return this.tailorServiceModel.findOne({
      where: {
        tailorId,
      },
    });
  }

  async removeTailorServices(
    tailorServiceId: string,
    t: Transaction,
  ): Promise<void> {
    const taylorService = await this.tailorServiceModel.findOne({
      where: {
        id: tailorServiceId,
      },
      transaction: t,
    });
    await taylorService.destroy();
  }

  async updateTailorService(
    services: Services[],
    tailorId: string,
    t?: Transaction,
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
}
