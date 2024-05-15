import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FileUploadService {
  constructor(private readonly prisma: PrismaService) {}


  
  async uploadFile(senderId: number, file: Express.Multer.File) {
    if (senderId !== undefined) { //extract info from file
      const { originalname, path } = file;
    
      //type assersion override to any to ignore the type error
      const data: any = {
        name: originalname.toString(),
        url: '',
        filePath: path.toString(),
      };
  

      return this.prisma.file.create({
        data: data,
      });
    } else {
      return {
        message: 'File uploaded successfully',
        filename: file.originalname,
        filepath: file.path,
      };
    }
  }
}
