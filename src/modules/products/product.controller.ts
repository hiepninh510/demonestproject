import { Controller, Get, Param, UseGuards} from "@nestjs/common";
import { ProductService } from "./product.service";
import { AuthGurad } from "../auths/auth.gurads";


@Controller()
export class ProductController{
    constructor(private readonly productService:ProductService){}
    @Get("products")
    async getAllProducts(): Promise<any[]>{
        return this.productService.getAllProducts();
    }

    @UseGuards(AuthGurad)
    @Get("products/:id")
    async getByProductID(@Param('id') id:string):Promise<any>{
        return this.productService.getByProductID(id);
    }
}