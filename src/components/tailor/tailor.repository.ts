import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserImagesEntities } from '@components/users/entities/user-images.entities';
import { UserEntities } from '@components/users/entities/user.entities';
import { SaveImagesForDbRequest } from '@components/tailor/dto/request/save-images-for-db-request';
import { loggerMessages } from '@constants/logger.messages';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class TailorRepository {
  private readonly logger = new Logger(TailorRepository.name);

  constructor(
    @InjectModel(UserImagesEntities)
    private readonly userImagesModel: typeof UserImagesEntities,
    @InjectModel(UserEntities)
    private readonly userModel: typeof UserEntities,
    private sequelize: Sequelize,
  ) {}

  checkUser(userId: string): Promise<UserEntities> {
    return this.userModel.findOne({ where: { id: userId } });
  }

  previousImg(userId: string, key: string): Promise<UserImagesEntities[]> {
    return this.userImagesModel.findAll({
      where: { userId, type: key },
    });
  }

  async saveImagesForDb(
    filesTailor: SaveImagesForDbRequest[],
    userId: string,
    key: string,
  ): Promise<void> {
    const previousImages = await this.previousImg(userId, key).then((res) =>
      res ? res.map((el) => el.id) : [],
    );
    this.logger.log(loggerMessages.getPrevious('imgIds'), previousImages);
    await this.sequelize.transaction(async (t) => {
      await this.userImagesModel.bulkCreate(filesTailor, {
        transaction: t,
      });
      this.logger.log(loggerMessages.saveToDb());
      await this.userImagesModel.destroy({
        where: { id: previousImages },
        transaction: t,
      });
      this.logger.log(loggerMessages.remove('previousImages'));
    });
  }
}
