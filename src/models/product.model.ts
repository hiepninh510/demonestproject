import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product{
    @Prop()
    id:string;
    
    @Prop()
    name:string;

    @Prop()
    image:string;

    @Prop()
    priceOld:number;

    @Prop()
    priceNew:number;

    @Prop({default:false})
    delete:boolean 
}

export const ProductSchema = SchemaFactory.createForClass(Product);