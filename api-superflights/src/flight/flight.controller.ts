import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { PassengerService } from 'src/passenger/passenger.service';
import { FlightDataTransferObject } from './dto/flight.dto';
import { FlightService } from './flight.service';

@ApiTags('flights')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('flight')
export class FlightController {

  constructor(
    private readonly flightService: FlightService,
    private readonly passengerService: PassengerService
    ) {}

  @Post()
  create(@Body() body: FlightDataTransferObject) {
    return this.flightService.create(body)
  }

  @Get()
  findAll() {
    return this.flightService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.flightService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: FlightDataTransferObject) {
    return this.flightService.update(id, body)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.flightService.delete(id)
  }

  @Post(':flight/passenger/:passenger')
  async addPassenger(@Param('flight') flight: string, @Param('passenger') passenger: string) {

    const result = await this.passengerService.findOne(passenger)
    if(!result) throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND)

    return this.flightService.addPassenger(flight, passenger)
  }

}
