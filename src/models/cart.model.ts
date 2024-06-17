import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument} from "mongoose";

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart{

    @Prop({require:true,unique:true})
    email:string;

    @Prop({type:Date, default:Date.now})
    date_created: Date;


}

export const CartSchema = SchemaFactory.createForClass(Cart);