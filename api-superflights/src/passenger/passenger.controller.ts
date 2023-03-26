import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { PassengerDataTransferObject } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

@ApiTags('passengers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/passenger')
export class PassengerController {

  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  create(@Body() body: PassengerDataTransferObject) {
    return this.passengerService.create(body)
  }

  @Get()
  findAll() {
    return this.passengerService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.passengerService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: PassengerDataTransferObject) {
    return this.passengerService.update(id, body)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.passengerService.delete(id)
  }

}
