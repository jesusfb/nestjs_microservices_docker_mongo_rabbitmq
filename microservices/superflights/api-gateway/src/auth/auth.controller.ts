import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDataTransferObject } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.auth.guard';

@ApiTags('authentication')
@Controller('api/v2/auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Req() req) {
    return await this.authService.signIn(req.user)
  }

  @Post('signup')
  async signUp(@Body() body: UserDataTransferObject) {
    return await this.authService.signUp(body)
  }
}
