import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DTask } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {

  constructor(private readonly taskService: TaskService){}

  @Post()
  public create(@Body() body: DTask) {
    return this.taskService.create(body)
  }

  @Get()
  public findAll() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('Something was wrong!')
      }, 5000);
    })
    // return this.taskService.findAll()
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.taskService.findOne(id)
  }

  @Put(':id')
  public update(@Param('id') id: string, @Body() body: DTask) {
    return this.taskService.update(id, body)
  }

  @Delete(':id')
  public delete(@Param('id') id: string) {
    return this.taskService.delete(id)
  }
}
