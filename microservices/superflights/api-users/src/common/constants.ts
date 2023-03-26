export enum RabbitMQ {
  UserQueue =  'users',
}

export enum UserMessage {
  create  = 'UserCreate',
  findAll = 'UserFindAll',
  findOne = 'UserFindOne',
  update  = 'UserUpdate',
  delete  = 'UserDelete',
  valid   = 'UserValid'
}
