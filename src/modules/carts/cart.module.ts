import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Cart, CartSchema } from "../../../src/models/cart.model";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";
import { AuthModule } from "../auths/auth.module";

@Module({
    imports:[MongooseModule.forFeature([{name:Cart.name,schema:CartSchema}]),AuthModule,],
    controllers:[CartController],
    providers:[CartService],
    exports:[CartService],
    
})

export class CartModule{};