import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { Passenger } from 'src/common/models';
import { PassengerDataTransferObject } from './dto/passenger.dto';

@Injectable()
export class PassengerService {

  constructor(
    @InjectModel(Passenger.name) private readonly model: Model<IPassenger>
  ) {}

  async create(body: PassengerDataTransferObject): Promise<IPassenger> {
    const passenger = new this.model(Passenger)
    return await passenger.save()
  }

  async findAll(): Promise<IPassenger[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<IPassenger> {
    return await this.model.findById(id).exec();
  }

  async update(id: string, body: PassengerDataTransferObject): Promise<IPassenger> {
    return await this.model.findByIdAndUpdate(id, body, { new: true }).exec()
  }

  async delete(id: string): Promise<{ status: number, message: string }> {
    await this.model.findByIdAndDelete(id).exec()
    return { status: HttpStatus.OK, message: 'Record deleted.' }
  }

}
