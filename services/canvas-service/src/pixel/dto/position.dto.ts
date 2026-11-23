import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsNotEmpty, Min} from "class-validator";
import { Type } from 'class-transformer';

export class PositionDto {
    @ApiProperty({ example: '1', description: 'The x position' })
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    @Min(0)
    x: number

    @ApiProperty({ example: '1', description: 'The y position' })
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    @Min(0)
    y: number

}