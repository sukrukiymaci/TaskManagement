import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find((task) => task.id === id)
    }

    deleteTaskById(id: string): void {
        /* This is one way using splice: */

        // const calc = this.tasks.find((task)=> task.id === id);
        // let num = this.tasks.indexOf(calc);
        // this.tasks.splice(num,1);

        /* Another one which could be more useful. both can stay and work fine but no need */
        this.tasks = this.tasks.filter((task) => id !== task.id);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    }
}
