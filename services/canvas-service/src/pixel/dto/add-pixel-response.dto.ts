import {BaseNodeDto} from "../../dto/base-node.dto";
import {PixelDto} from "./pixel.dto";
import {ApiProperty, IntersectionType} from "@nestjs/swagger";

export class AddPixelResponseDto extends IntersectionType(
    BaseNodeDto,
    PixelDto,
) {
    @ApiProperty({example: 10, description: "cooldown in seconds before next set pixel"})
    cooldown: number
}