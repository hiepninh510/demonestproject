import { Controller, Get, Param, Req, UseGuards} from "@nestjs/common";
import { ProductService } from "./product.service";
import { AuthGurad } from "../auths/auth.gurads";
import { ObjectId } from "mongoose";


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


    @Get("product/page=?:page")
    async pagination(@Param('page') page:string):Promise<any>{
        return this.productService.pagination(page);
    }

    @UseGuards(AuthGurad)
    @Get("products/addtocart/:id")
    async add_To_Cart(@Param('id') id:ObjectId, @Req() req):Promise<any>{
        const email = req.user.email;
        if(!email){
            throw new Error('Username not found in JWT payload');
        }
        return this.productService.add_Product_To_Cart(id,email);
    }

}