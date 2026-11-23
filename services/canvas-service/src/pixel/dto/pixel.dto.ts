import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, IsOptional, IsIn, IsInt, IsHexColor} from 'class-validator';
import {PositionDto} from "./position.dto";

export class PixelDto extends PositionDto{

    @ApiProperty({example: "#F1F2F3", description: "The color of the pixel"})
    @IsHexColor()
    @IsNotEmpty()
    color: string
}