import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {PixelService} from "./pixel.service";
import {PixelDto} from "./dto/pixel.dto";
import {AddPixelResponseDto} from "./dto/add-pixel-response.dto";
import {PositionDto} from "./dto/position.dto";
import {GetPixelsResponseDto} from "./dto/get-pixels-response.dto";

@Controller("api/pixels")
export class PixelController {
  constructor(private readonly appService: PixelService) {}

  @Get()
  getPixels(): GetPixelsResponseDto {
    return this.appService.getPixels()
  }

  @Post()
  addPixel(@Body() pixel: PixelDto): AddPixelResponseDto {
    return this.appService.addPixel(pixel, "hello")
  }

  @Get(":x/:y")
  getPixel(@Param() position: PositionDto): PixelDto {
    return this.appService.getPixel(position);
  }
}
