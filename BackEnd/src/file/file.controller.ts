//importing the DecodedToken interface
interface DecodedToken {
    userId: number;
}



// file.controller.ts
import { Controller, Post, UseGuards, UploadedFile, UseInterceptors, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileUploadService } from './file-upload.service';
import { Request } from 'express';


@Controller('files')
@UseGuards(JwtAuthGuard)
export class FileController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() request: Request) {
    const decodedToken = request.user as DecodedToken;
    const senderId = decodedToken.userId;
    return this.fileUploadService.uploadFile(senderId, file);
  }
}
