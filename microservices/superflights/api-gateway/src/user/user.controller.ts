import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UserMessage } from 'src/common/constants';
import { IUser } from 'src/common/interfaces/user.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client.proxy';
import { UserDataTransferObject } from './dto/user.dto';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v2/user')
export class UserController {

  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private _clientProxyUser = this.clientProxy.clientProxyUsers()

  @Post()
  create(@Body() body: UserDataTransferObject): Observable<IUser> {
    return this._clientProxyUser.send(UserMessage.create, body);
  }

  @Get()
  findAll(): Observable<IUser[]> {
    return this._clientProxyUser.send(UserMessage.findAll, '')
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IUser> {
    return this._clientProxyUser.send(UserMessage.findOne, id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UserDataTransferObject): Observable<IUser> {
    return this._clientProxyUser.send(UserMessage.update, {id, body})
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<{ status: number, message: string}> {
    return this._clientProxyUser.send(UserMessage.delete, id)
  }

}
