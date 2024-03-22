import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World   by karthik !';
  }
  helloWorld(): string{
    return 'Hello world by karthik to the world !';
  }
}
