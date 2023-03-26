import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { Flight } from 'src/common/models';
import { FlightDataTransferObject } from './dto/flight.dto';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(Flight.name) private readonly model: Model<IFlight>,
  ) {}

  async create(body: FlightDataTransferObject): Promise<IFlight> {
    const flight = new this.model(body);
    return await flight.save();
  }

  async findAll(): Promise<IFlight[]> {
    return await this.model.find().populate('passengers').exec();
  }

  async findOne(id: string): Promise<IFlight> {
    return await this.model.findById(id).populate('passengers').exec();
  }

  async update(id: string, body: FlightDataTransferObject): Promise<IFlight> {
    return await this.model.findByIdAndUpdate(id, body, { new: true }).exec();
  }

  async delete(id: string): Promise<{ status: number; message: string }> {
    await this.model.findByIdAndDelete(id).exec();
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }

  async addPassenger(flight: string, passenger: string): Promise<IFlight> {
    return await this.model
      .findByIdAndUpdate(
        flight,
        {
          $addToSet: {
            passengers: passenger,
          },
        },
        {
          new: true,
        },
      ).populate('passengers').exec();
  }
}
