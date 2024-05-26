import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Product } from './models/product.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async findAllProducts(): Promise<Product[]> {
    return this.appService.onModuleInit();
  }

  getHello():string{
    return this.getHello();
  }
}
