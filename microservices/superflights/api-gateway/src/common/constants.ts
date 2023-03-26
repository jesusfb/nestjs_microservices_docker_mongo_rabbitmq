export enum RabbitMQ {
  UserQueue =  'users',
  PassengerQueue = 'passengers',
  FlightQueue = 'flights'
}

export enum UserMessage {
  create  = 'UserCreate',
  findAll = 'UserFindAll',
  findOne = 'UserFindOne',
  update  = 'UserUpdate',
  delete  = 'UserDelete',
  valid   = 'UserValid'
}

export enum PassengerMessage {
  create  = 'PassengerCreate',
  findAll = 'PassengerFindAll',
  findOne = 'PassengerFindOne',
  update  = 'PassengerUpdate',
  delete  = 'PassengerDelete',
}

export enum FlightMessage {
  create  = 'FlightCreate',
  findAll = 'FlightFindAll',
  findOne = 'FlightFindOne',
  update  = 'FlightUpdate',
  delete  = 'FlightDelete',
  addPassenger = 'FlighAddPassenger'
}