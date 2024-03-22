import { Controller, Post, Body, Headers, Res,Get,HttpStatus,UseInterceptors,UploadedFiles   } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as formidable from 'formidable';
import { Buffer } from 'buffer';
import { PDFDocument } from 'pdf-lib';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello')
  helloWorld(): string {
    return this.appService.helloWorld();
  }

  @Post('login')
  login(): any {
    return {};
  }

  @Post('upload')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'pdf', maxCount: 1 }]))
  async uploadPdf(
    @UploadedFiles() files,
    @Res() res,
    @Body('selectedPages') selectedPages: Record<string, boolean>
  ): Promise<void> {
    const pdfFile = files.pdf[0];

    if (!pdfFile) {
      res.status(HttpStatus.BAD_REQUEST).send('No PDF file uploaded');
      return;
    }

    const pdfBuffer = Buffer.from(pdfFile.buffer);
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const modifiedPdf = await PDFDocument.create();

    for (let i = 0; i < pdfDoc.getPageCount(); i++) {
      if (selectedPages[i + 1]) {
        const [copiedPage] = await modifiedPdf.copyPages(pdfDoc, [i]);
        modifiedPdf.addPage(copiedPage);
      }
    }

    const modifiedPdfBytes = await modifiedPdf.save();
    res.setHeader('Content-Type', 'application/pdf');
    console.log(modifiedPdf.getPageCount());
    res.send(files);
  }


}
