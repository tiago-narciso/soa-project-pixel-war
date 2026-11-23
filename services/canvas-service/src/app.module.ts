import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import {NodeConfigModule} from "./node-config/node-config.module";
import {PixelModule} from "./pixel/pixel.module";
import { join } from 'node:path';

@Module({
  imports: [NodeConfigModule, PixelModule,
    ServeStaticModule.forRoot({
      rootPath: "src/public",
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
