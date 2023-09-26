import { Body, Controller, Delete, Get, Post,Put, UseGuards } from '@nestjs/common';
import { CurrentUserDto, LoginDto, RegisterDto, UserUpdateDto } from '../dto/user.dto';
import { AdminAuthorizationGuard, AuthorizationGuard } from '../groud/user.groud';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { CurrentUser } from '../getUserDecorator';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiResponse({ status: 201, description: 'Created user!' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('/register')
  async register(@Body() user: RegisterDto) {
    return await this.userService.register(user);
  }

  @Post('/login')
  async login(@Body() user: LoginDto) {
    return await this.userService.login(user);
  }

  @Put('/update')
  @ApiBearerAuth()
  @UseGuards(AuthorizationGuard)
  async update(
    @CurrentUser() user: CurrentUserDto,
    @Body() reqUser: UserUpdateDto,
  ) {
    return await this.userService.update(user, reqUser);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthorizationGuard)
  async getOne(@CurrentUser() user: CurrentUserDto) {
    return await this.userService.getOne(user);
  }

  @Get('/all_users')
  @ApiBearerAuth()
  @UseGuards(AdminAuthorizationGuard)
  async getAll(@CurrentUser() user: CurrentUserDto) {
    return await this.userService.getAll(user);
  }

  @Delete('/delete')
  @ApiBearerAuth()
  @UseGuards(AuthorizationGuard)
  async delete(@CurrentUser() user: CurrentUserDto) {
    return await this.userService.delete(user);
  }
}
