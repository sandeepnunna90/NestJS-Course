import { Body, Controller, Get, Post } from '@nestjs/common';
import { title } from 'process';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  // NestJs provides 2 ways to retrieve request parameters
  // using the body decorator below
  // downside to this is the body can have any type of properties
  // we will need to add some validations inside to restrict
  //   @Post()
  //   createTask(@Body() body) {
  //     console.log('body', body);
  //   }

  // Second way to use individual properties and
  // decorate them with body decorator
  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    console.log('title', title);
    console.log('description', description);

    return this.tasksService.createTask(title, description);
  }
}
