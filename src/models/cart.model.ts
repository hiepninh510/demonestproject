import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument} from "mongoose";

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart{
    @Prop({type:[{id:String,number:Number}]})
    products:{id:string,number:number}[];

    @Prop({require:true,unique:true})
    email:string;

    @Prop({default:false})
    delete:boolean;
}

export const CartSchema = SchemaFactory.createForClass(Cart);