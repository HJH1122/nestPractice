import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto{

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsOptional()
    @IsString()
    thumnail: string;

}