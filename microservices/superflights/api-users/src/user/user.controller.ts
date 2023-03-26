import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMessage } from 'src/common/constants';
import { UserDataTransferObject } from './dto/user.dto';
import { UserService } from './user.service';


@Controller()
export class UserController {

  constructor(private readonly userService: UserService){}

  @MessagePattern(UserMessage.create)
  create(@Payload() body: UserDataTransferObject) {
    return this.userService.create(body)
  }

  @MessagePattern(UserMessage.findAll)
  findAll() {
    return this.userService.findAll()
  }

  @MessagePattern(UserMessage.findOne)
  findOne(@Payload() id: string) {
    return this.userService.findOne(id)
  }

  @MessagePattern(UserMessage.update)
  update(@Payload() payload: any) {
    return this.userService.update(payload.id, payload.body)
  }

  @MessagePattern(UserMessage.delete)
  delete(@Payload() id: string) {
    return this.userService.delete(id)
  }

  @MessagePattern(UserMessage.valid)
  async validateUser(@Payload() payload: any) {
    const user = await this.userService.findByUsername(payload.username)
    const isvalid = await this.userService.checkPassword(payload.password, user.password)
    if(user && isvalid) return user
    return null;
  }
}
