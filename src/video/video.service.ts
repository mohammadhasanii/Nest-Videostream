import { Injectable,HttpStatus } from '@nestjs/common';
import { createReadStream, statSync } from 'fs';

@Injectable()
export class VideoService {


  async streamVideo(id:string,headers:any,res:any){

    const videoPath = `assets/${id}.mp4`;
    const { size } = statSync(videoPath);
    const videoRange = headers.range;
    console.log(videoRange);
    const parts = videoRange?.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 16) : size - 1;
    //If you want to have less delay when receiving video and stream,
    // you can receive more chunks from the server and increase this number.
    //Do not exceed 10 to increase server performance.
    //You can use 4 or 6 or 7 instead of 2
    //Tips: Of course, it is better to do this chunk dynamically by checking the internet speed of the user
    const chunksize = end - start + 2;
    const readStreamfile = createReadStream(videoPath, {
      start,
      end,
      highWaterMark: 60,
    });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Content-Length': chunksize,
    };
    res.writeHead(HttpStatus.PARTIAL_CONTENT, head); //206
    readStreamfile.pipe(res);

  }


  
}
