import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

    async createTask(payload: CreateTaskDto){

        const newTask = this.taskRepository.create(payload);

        await this.taskRepository.save(newTask);

        return {
            message: "테스크를 생성하였습니다.",
            statusCode: HttpStatus.CREATED,
        }

    }

    async updateTask(id: number, payload: UpdateTaskDto): Promise<TaskEntity>{

        const task = await this.getTask(id);

        Object.assign(task, payload);

        return await this.taskRepository.save(task);
    }

    async removeTask(id: number){
        const task = await this.taskRepository.findOne({where : {id}});

        if(!task){
            throw new NotFoundException(`${id}의 테스크를 찾을 수 없습니다.`)
        }
        
        await this.taskRepository.delete(id);

        return {
            message: '테스크를 삭제하였습니다.',
            statusCode: HttpStatus.NO_CONTENT,
        }

        
    }

}
