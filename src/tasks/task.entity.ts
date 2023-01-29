// nestJS doesn't know what to do with decorators provided with class transformer,
// so we should add interceptor to tell nestjs to do something when a request comes in
// can apply interceptors at handler level/controller level/application level
import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true }) //Remove the user object from the payload when is converted to text, doesn't happen when returning JSON resposne
  user: User;
}
