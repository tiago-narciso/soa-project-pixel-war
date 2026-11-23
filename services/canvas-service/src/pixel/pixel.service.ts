import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {NODE_ID} from "../node-config/node-config.module";
import {PixelDto} from "./dto/pixel.dto";
import {AddPixelResponseDto} from "./dto/add-pixel-response.dto";
import {PositionDto} from "./dto/position.dto";
import {GetPixelsResponseDto} from "./dto/get-pixels-response.dto";
import {EventsGateway} from "../events/events.gateway";

const COOLDOWN = 10
const DEFAULT_COLOR = "#FFFFFF"
const SIZE = 100

@Injectable()
export class PixelService {
    private pixels: Map<PositionDto, PixelDto> = new Map()
    private lastPlacement: Record<string, number> = {}

    constructor(@Inject(NODE_ID) private readonly nodeId: string, private readonly eventsGateway: EventsGateway) {
    }

    getPixels(): GetPixelsResponseDto {
        return {
            pixels: Array.from(this.pixels.values()),
            defaultColor: DEFAULT_COLOR,
            nodeId: NODE_ID,
            size: SIZE
        };
    }

    addPixel(pixel: PixelDto, userId: string): AddPixelResponseDto {
        const elapsed = (Date.now() - (this.lastPlacement[userId] || 0)) / 1000;
        if (this.lastPlacement[userId] && elapsed < COOLDOWN) {
            const retryAfter = Math.ceil(COOLDOWN - elapsed);
            throw new HttpException(
                {
                    statusCode: HttpStatus.TOO_MANY_REQUESTS,
                    message: 'Too many requests',
                    retryAfter,
                },
                HttpStatus.TOO_MANY_REQUESTS,
            );
        }
        this.lastPlacement[userId] = Date.now()

        this.pixels.set({x: pixel.x, y: pixel.y}, pixel);

        this.eventsGateway.newPixel(userId, pixel)
        return {...pixel, cooldown: COOLDOWN, nodeId: NODE_ID}
    }

    getPixel(position: PositionDto): PixelDto {
        return this.pixels.get(position) || {...position, color: DEFAULT_COLOR}
    }
}
