import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { FlightMessage, PassengerMessage } from 'src/common/constants';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client.proxy';
import { FlightDataTransferObject } from './dto/flight.dto';

@ApiTags('flights')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v2/flight')
export class FlightController {

  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private _clientProxyFlights = this.clientProxy.clientProxyFlights()
  private _clientProxyPassengers = this.clientProxy.clientProxyPassengers()

  @Post()
  create(@Body() body: FlightDataTransferObject): Observable<IFlight> {
    return this._clientProxyFlights.send(FlightMessage.create, body);
  }

  @Get()
  findAll(): Observable<IFlight[]> {
    return this._clientProxyFlights.send(FlightMessage.findAll, '')
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IFlight> {
    return this._clientProxyFlights.send(FlightMessage.findOne, id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: FlightDataTransferObject): Observable<IFlight> {
    return this._clientProxyFlights.send(FlightMessage.update, {id, body})
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<{ status: number, message: string}> {
    return this._clientProxyFlights.send(FlightMessage.delete, id)
  }

  @Post(':flight/passenger/:passenger')
  async addPassenger(@Param('flight') flight: string, @Param('passenger') passenger: string) {
    const result = await this._clientProxyPassengers.send(PassengerMessage.findOne, passenger).toPromise()
    if(!result) throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND)
    return this._clientProxyFlights.send(FlightMessage.addPassenger, { flight, passenger})
  }

}
