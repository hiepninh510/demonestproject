import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Cart, CartSchema } from "../../../src/models/cart.model";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";
import { AuthModule } from "../auths/auth.module";
import { Product, ProductSchema } from "../../../src/models/product.model";

@Module({
    imports:[MongooseModule.forFeature([{name:Cart.name,schema:CartSchema}]),
    MongooseModule.forFeature([{name:Product.name,schema:ProductSchema}]),
    AuthModule,],
    controllers:[CartController],
    providers:[CartService],
    exports:[CartService],
    
})

export class CartModule{};