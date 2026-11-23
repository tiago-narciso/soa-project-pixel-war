import {ApiProperty} from "@nestjs/swagger";

export class BaseNodeDto {
    @ApiProperty({ example: 'node-1', description: 'Id of the server that trated the request' })
    nodeId: string;
}