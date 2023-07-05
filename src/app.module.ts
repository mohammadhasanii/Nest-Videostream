import { Module } from '@nestjs/common';
import { VideoModule } from './video/video.module';

@Module({
  imports: [VideoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
