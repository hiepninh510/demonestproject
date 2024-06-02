import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId } from "mongoose";

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart{
    @Prop()
    products:Array<ObjectId>

    @Prop({require:true,unique:true})
    email:string

    @Prop({default:false})
    delete:boolean
}

export const CartSchema = SchemaFactory.createForClass(Cart);