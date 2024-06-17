import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Put, Req, UseGuards,} from "@nestjs/common";
import { CartService } from "./cart.service";
import { AuthGurad } from "../auths/auth.gurads";

@Controller('cart')
export class CartController{
    constructor( private readonly cartService:CartService){};

    @UseGuards(AuthGurad)
    @Get()
    async to_CartUser(@Req() req):Promise<any>{
        return await this.cartService.to_CartUser(req.user.email);
    }

    @UseGuards(AuthGurad)
    @HttpCode(HttpStatus.OK)
    @Put()
    async dele_Number(@Req() req,@Body() body:any):Promise<any>{
        return await this.cartService.reduce_Number(body.id,req.user.email);
    }

    @UseGuards(AuthGurad)
    @HttpCode(HttpStatus.OK)
    @Delete()
    async delete_Product(@Req() req, @Body() body:any):Promise<any>{
        return await this.cartService.delete_Product(body.id,req.user.email);
    }
}