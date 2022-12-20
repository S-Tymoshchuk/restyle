import { Module } from '@nestjs/common';
import { BasketController } from '@components/basket/basket.controller';
import { BasketService } from '@components/basket/basket.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BasketEntities } from '@components/basket/entities/basket.entities';
import { BasketRepository } from '@components/basket/basket.repository';
import { BasketItemEntities } from '@components/basket/entities/basket-item.entities';
import { BasketItemServiceEntities } from '@components/basket/entities/basket-item-service.entities';
import { BasketItemMaterialEntities } from '@components/basket/entities/basket-item-material.entities';
import { TailorEntities } from '@components/users/entities/tailor.entities';

@Module({
  imports: [
    SequelizeModule.forFeature([
      BasketEntities,
      BasketItemEntities,
      BasketItemServiceEntities,
      BasketItemMaterialEntities,
      TailorEntities,
    ]),
  ],
  controllers: [BasketController],
  providers: [BasketService, BasketRepository],
  exports: [BasketRepository],
})
export class BasketModule {}
