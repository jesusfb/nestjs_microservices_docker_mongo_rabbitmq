import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PassengerMessage } from 'src/common/constants';
import { PassengerDataTransferObject } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

@Controller('api/v2/passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @MessagePattern(PassengerMessage.create)
  create(@Payload() body: PassengerDataTransferObject) {
    return this.passengerService.create(body);
  }

  @MessagePattern(PassengerMessage.findAll)
  findAll() {
    return this.passengerService.findAll();
  }

  @MessagePattern(PassengerMessage.findOne)
  findOne(@Payload() id: string) {
    return this.passengerService.findOne(id);
  }

  @MessagePattern(PassengerMessage.update)
  update(@Payload() payload: any) {
    return this.passengerService.update(payload.id, payload.body);
  }

  @MessagePattern(PassengerMessage.delete)
  delete(@Payload() id: string) {
    return this.passengerService.delete(id); 
  }
}
