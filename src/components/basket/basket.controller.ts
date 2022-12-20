import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BASKET_TAG } from '@docs/tags';
import { BASKET_PATH } from '@docs/path';
import { AuthJWT } from '@decorators/auth-jwt.decorator';
import { CreateBasketRequest } from '@components/basket/dto/request/create-basket-request';
import { IReqUser } from '@decorators/auth.user.data';
import { User } from '@decorators/user.decorator';
import { BasketService } from '@components/basket/basket.service';
import { loggerMessages } from '@constants/logger.messages';
import { BasketId } from '@components/basket/dto/request/get-basket-param-request';
import { ParamId } from '@components/core/param/general-param-id';

@AuthJWT()
@ApiTags(BASKET_TAG)
@Controller(BASKET_PATH)
export class BasketController {
  private readonly logger = new Logger(BasketController.name);
  constructor(private readonly basketService: BasketService) {}

  @Post()
  createBasket(@Body() body: CreateBasketRequest, @User() user: IReqUser) {
    this.logger.log(loggerMessages.create('basket'), body);
    return this.basketService.createOrder(body, user.id);
  }

  @ApiOkResponse()
  @Get('customer/:basketId')
  getBasketById(@Param() param: BasketId, @User() user: IReqUser) {
    return this.basketService.getBasketById(param.basketId, user.id);
  }

  @Delete(':id')
  removeBasketItem(@Param() param: ParamId, @User() user: IReqUser) {
    return this.basketService.removeBasketItem(param.id, user.id);
  }
}
