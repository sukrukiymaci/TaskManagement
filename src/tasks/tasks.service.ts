import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private tasksRepository: TaskRepository,
    ){}

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;

    //     let tasks = this.getAllTasks();
    //     if (status) {
    //         tasks = tasks.filter((task) => task.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter((task) => {
    //             if (task.title.includes(search) || task.description.includes(search)) {
    //                 return true;
    //             }
    //             return false;
    //         });
    //     }
    //     return tasks;
    // }
        async getTaskById(id: string): Promise<Task>{
            const found = await this.tasksRepository.findOne(id);
            if(!found){
                throw new NotFoundException(`Task with ID "${id}" not found`);
            }
            return found;
        }

    async deleteTaskById(id: string): Promise<void> {
        /* This is not the better option since we need to query the database twice first to find and second to remove */
        // const found = await this.tasksRepository.findOne(id);
        // if(!found){
        //     throw new NotFoundException(`Task with ID "${id}" not found`);
        // } 
        // await this.tasksRepository.remove(found);

        // This is one query to database better comparted to remove
        const found = await this.tasksRepository.delete(id);
        if(found.affected === 0){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        } 
    }
    
    async updateTask(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await this.tasksRepository.save(task);
        return task;
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
    }
}
