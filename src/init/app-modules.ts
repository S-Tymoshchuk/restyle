import { ConfigModule } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntities } from '@components/users/entities/user.entities';
import { CredentialsEntities } from '@components/authentication/entities/credentials.entities';
import { TailorEntities } from '@components/users/entities/tailor.entities';
import { UserImagesEntities } from '@components/users/entities/user-images.entities';
import { TailorMaterialsEntities } from '@components/users/entities/tailor-materials.entities';
import { MaterialsEntities } from '@components/seeder-tools/entities/materials.entities';
import { TailorServiceEntities } from '@components/users/entities/tailor-service.entities';
import { ServicesEntities } from '@components/seeder-tools/entities/service.entities';
import { ClothingItemsEntities } from '@components/seeder-tools/entities/clothing-items.entities';
import { TailorPriceEntities } from '@components/users/entities/tailor-price.entities';
import { ServicesTypeEntities } from '@components/seeder-tools/entities/service-type.entities';
import configuration from '@config/configuration';
import { WinstonModule } from 'nest-winston';
import loggerConfig from '@utils/logger/logger-config';
import { OrderEntities } from '@components/order/entities/order.entities';
import { BasketEntities } from '@components/basket/entities/basket.entities';
import { BasketItemEntities } from '@components/basket/entities/basket-item.entities';
import { BasketItemMaterialEntities } from '@components/basket/entities/basket-item-material.entities';
import { BasketItemServiceEntities } from '@components/basket/entities/basket-item-service.entities';
import { ReviewEntities } from '@components/review/entities/review.entities';
import { ReviewAnswersEntities } from '@components/seeder-tools/entities/review-answers.entities';
import { ReviewOptionsEntities } from '@components/review/entities/review-options.entities';

export const initAppModules = [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
  }),
  WinstonModule.forRootAsync({
    useFactory: () => loggerConfig(),
  }),
  SequelizeModule.forRoot({
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_BASE,
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT),
    dialect: 'postgres',
    define: {
      timestamps: true,
      underscored: true,
    },
    logging: (message) => {
      Logger.debug(message);
    },
    synchronize: true,
    autoLoadModels: true,
    models: [
      UserEntities,
      CredentialsEntities,
      UserImagesEntities,
      TailorEntities,
      TailorMaterialsEntities,
      MaterialsEntities,
      ServicesEntities,
      ClothingItemsEntities,
      TailorServiceEntities,
      TailorPriceEntities,
      ServicesTypeEntities,
      BasketEntities,
      BasketItemEntities,
      BasketItemMaterialEntities,
      BasketItemServiceEntities,
      OrderEntities,
      ReviewEntities,
      ReviewAnswersEntities,
      ReviewOptionsEntities,
    ],
  }),
];
