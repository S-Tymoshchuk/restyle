import { Body, Controller, Get, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { USER_TAG } from '@docs/tags';
import { USER_PATH } from '@docs/path';
import { UsersService } from '@components/users/users.service';
import { AuthJWT } from '@decorators/auth-jwt.decorator';
import { User } from '@decorators/user.decorator';
import { IReqUser } from '@decorators/auth.user.data';
import { UserSearchRequest } from '@components/users/dto/request/user-search-request';
import { TailorBusinessUpdateRequest } from '@components/users/dto/request/tailor-business-update-request';
import { TailorServiceUpdateRequest } from '@components/users/dto/request/tailor-service-update-request';

@AuthJWT()
@ApiTags(USER_TAG)
@Controller(USER_PATH)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('profile')
  getUserInfo(@User() user: IReqUser) {
    return this.userService.getUserMe(user.id);
  }

  @Post('search')
  getTailors(@Body() body: UserSearchRequest) {
    return this.userService.getTailorsBySearch(body);
  }

  @Patch('business/tailor')
  updateTailor(
    @Body() body: TailorBusinessUpdateRequest,
    @User() user: IReqUser,
  ) {
    return this.userService.updateTailorBusiness(body, user.id);
  }

  @Put()
  updateTailorService(
    @User() user: IReqUser,
    @Body() body: TailorServiceUpdateRequest,
  ) {
    return this.userService.updateTailorService(user.id, body.services);
  }
}
