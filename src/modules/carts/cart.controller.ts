import { Controller, Get, Req, UseGuards,} from "@nestjs/common";
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
}