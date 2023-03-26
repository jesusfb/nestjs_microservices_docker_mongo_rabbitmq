import { Injectable } from '@nestjs/common';
import { DTask } from './dto/task.dto';
import { ITask } from './interfaces/task.interface';
import { v4 as uuid } from 'uuid'

@Injectable()
export class TaskService {

  tasks: ITask[] = [];

  create(dtask: DTask): ITask {
    const task = {
      id: uuid(),
      ...dtask
    }
    this.tasks.push(task)
    return task
  }

  findAll():ITask[] {
    return this.tasks
  }
  
  findOne(id: string): ITask {
    return this.tasks.find(x => x.id === id);
  }

  update(id: string, body: DTask): ITask {
    const newTask = { id, ...body }
    this.tasks = this.tasks.map(x => x.id === id ? newTask : x)
    return newTask
  }

  delete(id: string): string {
    this.tasks = this.tasks.filter(x => x.id !== id);
    return 'Task deleted'
  }
}
