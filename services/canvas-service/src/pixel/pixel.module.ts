import { Module } from '@nestjs/common';
import { PixelController } from './pixel.controller';
import {PixelService} from "./pixel.service";
import {EventsGateway} from "../events/events.gateway";

@Module({
  imports: [],
  controllers: [PixelController],
  providers: [PixelService, EventsGateway],
})
export class PixelModule {}
