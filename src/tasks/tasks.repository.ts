import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {}

// ******* NOTES: ********
//
// Creating Repository means we are following the DataMapper Pattern instead of Active Record pattern
// This means we keep the logic that interacts with the database in a seperate file called repository
// And the entity file remains clean instead (as a pure function). This approach is good for large applications
