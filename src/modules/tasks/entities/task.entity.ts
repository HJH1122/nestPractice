import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CreateTaskDto } from "../dto";

@Entity("tasks")
export class TaskEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    category: string;

    @Column()
    thumbnail: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @CreateDateColumn({name: 'updated_at'})
    updatedAt: Date;

}