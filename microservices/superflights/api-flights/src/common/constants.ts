export enum RabbitMQ {
  FlightQueue = 'flights'
}

export enum FlightMessage {
  create  = 'FlightCreate',
  findAll = 'FlightFindAll',
  findOne = 'FlightFindOne',
  update  = 'FlightUpdate',
  delete  = 'FlightDelete',
  addPassenger = 'FlighAddPassenger'
}