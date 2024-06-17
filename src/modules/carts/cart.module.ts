import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Cart, CartSchema } from "../../../src/models/cart.model";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";
import { AuthModule } from "../auths/auth.module";
import { Product, ProductSchema } from "../../../src/models/product.model";
import { Cart_Product, Cart_ProductSchema } from "../../../src/models/cart_product.model";

@Module({
    imports:[MongooseModule.forFeature([{name:Cart.name,schema:CartSchema}]),
    MongooseModule.forFeature([{name:Product.name,schema:ProductSchema}]),
    MongooseModule.forFeature([{name:Cart_Product.name,schema:Cart_ProductSchema}]),
    AuthModule,],
    controllers:[CartController],
    providers:[CartService],
    exports:[CartService],
    
})

export class CartModule{};