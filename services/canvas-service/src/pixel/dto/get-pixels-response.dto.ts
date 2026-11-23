import {BaseNodeDto} from "../../dto/base-node.dto";
import {PixelDto} from "./pixel.dto";
import {ApiProperty} from "@nestjs/swagger";

export class GetPixelsResponseDto extends BaseNodeDto {
    @ApiProperty({example: [{x: 10, y: 20, color: "#FFFFFF"}, {x: 2, y: 1, color: "#1FFFFF"}], description: "Canvas colored pixels"})
    pixels: PixelDto[]

    @ApiProperty({example: "#205841", description: "The default color on the canvas when there are no pixels"})
    defaultColor: string

    @ApiProperty({example: 100, description: "Size of the pixel map"})
    size: number
}