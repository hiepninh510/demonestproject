import { Controller, Get, Param } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "src/models/product.model";

@Controller()
export class ProductController{
    constructor(private readonly productService:ProductService){}
    @Get("products")
    async getAllProducts(): Promise<Product[]>{
        return this.productService.getAllProducts();
    }

    @Get("products/id=?:id")
    async getByProductID(@Param('id') id:string):Promise<Product>{
        return this.productService.getByProductID(id);
    }
}