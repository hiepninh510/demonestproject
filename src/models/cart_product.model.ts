import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type Cart_ProductDocument = HydratedDocument<Cart_Product>;

@Schema()
export class Cart_Product{
    @Prop({type:String, required:true})
    email:string;

    @Prop({type:String, required:true,ref:"Product"})
    product:string;

    @Prop({type:Number,default:1})
    quality:number;
}

export const Cart_ProductSchema = SchemaFactory.createForClass(Cart_Product);