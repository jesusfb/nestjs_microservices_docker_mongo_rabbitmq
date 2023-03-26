import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { PassengerMessage } from 'src/common/constants';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client.proxy';
import { PassengerDataTransferObject } from './dto/passenger.dto';

@ApiTags('passengers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v2/passenger')
export class PassengerController {

  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private _clientProxyPassengers = this.clientProxy.clientProxyPassengers()

  @Post()
  create(@Body() body: PassengerDataTransferObject): Observable<IPassenger> {
    return this._clientProxyPassengers.send(PassengerMessage.create, body);
  }

  @Get()
  findAll(): Observable<IPassenger[]> {
    return this._clientProxyPassengers.send(PassengerMessage.findAll, '')
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IPassenger> {
    return this._clientProxyPassengers.send(PassengerMessage.findOne, id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: PassengerDataTransferObject): Observable<IPassenger> {
    return this._clientProxyPassengers.send(PassengerMessage.update, {id, body})
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<{ status: number, message: string}> {
    return this._clientProxyPassengers.send(PassengerMessage.delete, id)
  }

}
