import { Injectable, OnModuleInit } from '@nestjs/common';
import { ProductService } from './modules/products/product.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly productService:ProductService){};

  onModuleInit() {
    return this.productService.getAllProducts();
  }

  getHello():string{
    return "Hello World!"
  }
}
