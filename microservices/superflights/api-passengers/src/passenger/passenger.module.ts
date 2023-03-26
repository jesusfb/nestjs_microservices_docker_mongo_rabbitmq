import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Passenger } from 'src/common/models';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';
import { PassengerSchema } from './schema/passenger.schema';

@Module({
  imports: [ 
    MongooseModule.forFeatureAsync([
      {
        name: Passenger.name,
        useFactory: () => PassengerSchema
      }
    ])
   ],
  controllers: [PassengerController],
  providers: [PassengerService]
})
export class PassengerModule {}
