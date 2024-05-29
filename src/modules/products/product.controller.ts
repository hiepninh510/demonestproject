import { Controller, Get, Param} from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller()
export class ProductController{
    constructor(private readonly productService:ProductService){}
    @Get("products")
    async getAllProducts(): Promise<any[]>{
        return this.productService.getAllProducts();
    }

    @Get("products/id=?:id")
    async getByProductID(@Param('id') id:string):Promise<any>{
        return this.productService.getByProductID(id);
    }
}