import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UserDataTransferObject } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/user')
export class UserController {

  constructor(private readonly userService: UserService){}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  create(@Body() body: UserDataTransferObject) {
    return this.userService.create(body)
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.userService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UserDataTransferObject) {
    return this.userService.update(id, body)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id)
  }
}
