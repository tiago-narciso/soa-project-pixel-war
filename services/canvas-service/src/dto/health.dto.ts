import {ApiProperty} from "@nestjs/swagger";
import {BaseNodeDto} from "./base-node.dto";

export class HealthDto extends BaseNodeDto {
    @ApiProperty({ example: 'ok', description: 'Status of the server' })
    status: string
}