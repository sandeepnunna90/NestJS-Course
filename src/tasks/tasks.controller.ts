import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
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
  createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(CreateTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
