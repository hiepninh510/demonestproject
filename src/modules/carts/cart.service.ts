import { Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Cart } from "../../../src/models/cart.model";

@Injectable()
export class CartService{
    constructor(@InjectModel(Cart.name) private CartModel:Model<any>,
    ){};

    async add_To_Cart(product:ObjectId, email:string):Promise<any>{
        const isCart = await this.CartModel.findOne({'email':email}).exec();
        if(isCart){
            isCart.products.push(product);
             await isCart.save();
            return isCart;
        } else{
            const newCart = new this.CartModel();
            newCart.products.push(product);
            newCart.email=email;
            await newCart.save();
            return newCart;
        }
    }

    async to_CartUser(email:string):Promise<any>{
        return await this.CartModel.findOne({"email":email}).exec();
    }

}