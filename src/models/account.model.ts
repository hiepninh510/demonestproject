import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account{
    @Prop({unique:true,required:true})
    email:string;
    @Prop({unique:true,required:true})
    password:string;
    @Prop()
    username:string;

}

export const AccountShema = SchemaFactory.createForClass(Account);