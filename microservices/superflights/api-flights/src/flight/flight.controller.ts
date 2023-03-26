import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightMessage } from 'src/common/constants';
import { FlightDataTransferObject } from './dto/flight.dto';
import { FlightService } from './flight.service';

@Controller()
export class FlightController {

  constructor(
    private readonly flightService: FlightService,
    ) {}

  @MessagePattern(FlightMessage.create)
  create(@Payload() body: FlightDataTransferObject) {
    return this.flightService.create(body)
  }

  @MessagePattern(FlightMessage.findAll)
  findAll() {
    return this.flightService.findAll()
  }

  @MessagePattern(FlightMessage.findOne)
  findOne(@Payload() id: string) {
    this.flightService.findOne(id)
  }

  @MessagePattern(FlightMessage.update)
  update(@Payload() payload: any) {
    return this.flightService.update(payload.id, payload.body)
  }

  @MessagePattern(FlightMessage.update)
  delete(@Payload() id: string) {
    return this.flightService.delete(id)
  }

  @MessagePattern(FlightMessage.addPassenger)
  addPassenger(@Payload() payload: any) {
    return this.flightService.addPassenger(payload.flight, payload.passenger)
  }

}
