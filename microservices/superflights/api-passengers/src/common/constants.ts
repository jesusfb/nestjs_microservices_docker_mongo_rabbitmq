export enum RabbitMQ {
  PassengerQueue = 'passengers',
}

export enum PassengerMessage {
  create  = 'PassengerCreate',
  findAll = 'PassengerFindAll',
  findOne = 'PassengerFindOne',
  update  = 'PassengerUpdate',
  delete  = 'PassengerDelete',
}
