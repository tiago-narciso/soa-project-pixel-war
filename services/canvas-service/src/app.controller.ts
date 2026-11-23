import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {HealthDto} from "./dto/health.dto";

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("health")
  getHello(): HealthDto {
    return this.appService.getHealth();
  }
}
