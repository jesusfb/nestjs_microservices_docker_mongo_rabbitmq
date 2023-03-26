import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserMessage } from 'src/common/constants';
import { ClientProxySuperFlights } from 'src/common/proxy/client.proxy';
import { UserDataTransferObject } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxy: ClientProxySuperFlights,
    private readonly jwtService: JwtService,
  ) {}

  private _clientProxyUser = this.clientProxy.clientProxyUsers();

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this._clientProxyUser.send(UserMessage.valid, { username, password }).toPromise()
    if (user) return user;
    return null;
  }

  async signIn(user: any) {  
    const payload = { username: user.username, sub: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async signUp(user: UserDataTransferObject) {
    return await this._clientProxyUser.send(UserMessage.create, user).toPromise();
  }
}
