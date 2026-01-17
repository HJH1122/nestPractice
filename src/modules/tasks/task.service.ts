import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {

    constructor (

        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
    ){}

    async getTasks(): Promise<TaskEntity[]>{
        return await this.taskRepository.find(); 
    }

    async getTask(id: number): Promise<TaskEntity>{

        const task = await this.taskRepository.findOne({
            where: { id },
        });

        if(!task){
            throw new NotFoundException(`ID값이 ${id}인 테스크가 없습니다.`)
        }

        return task;
    }

    createTask(payload: CreateTaskDto){}

    updateTask(id: number, payload: UpdateTaskDto){}

    removeTask(id: number){}

}
