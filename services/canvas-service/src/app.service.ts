import {Inject, Injectable} from '@nestjs/common';
import {NODE_ID} from "./node-config/node-config.module";
import {HealthDto} from "./dto/health.dto";

@Injectable()
export class AppService {
    constructor(@Inject(NODE_ID) private readonly nodeId: string) {
    }

    getHealth(): HealthDto {
        return {status: "ok", nodeId: this.nodeId}
    }
}
