import {
  Controller,
  Get,
  Param,
  Res,
  Header,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { Headers } from '@nestjs/common';
import { Response } from 'express';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('stream/:id')
  @Header('Accept-Ranges', 'bytes') //custom header for byte range
  @Header('Content-Type', 'video/mp4')
  async streamVideo(


    @Param('id') id: string,
    @Headers() headers,
    @Res() res: Response,) {
   
    return this.videoService.streamVideo(id,headers,res)
  }
}
