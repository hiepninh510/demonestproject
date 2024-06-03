import { Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types} from "mongoose";
import { Cart } from "../../../src/models/cart.model";
import { Product } from "../../../src/models/product.model";

@Injectable()
export class CartService{
    constructor(@InjectModel(Cart.name) private CartModel:Model<any>,
        @InjectModel(Product.name) private ProductModel:Model<any>,
    ){};

    async add_To_Cart(product:string, email:string):Promise<any>{
        const isCart = await this.CartModel.findOne({'email':email}).exec();
        if(!isCart){
            const cart = new this.CartModel();
            cart.email=email;
            cart.products = [{id:product,number:1}];
            await cart.save();
            return cart;
            
        } else{
            const productID = isCart.products.findIndex(_product => _product.id === product);
            if(productID === -1){
                isCart.products.push({id:product,number:1});
                await isCart.save();
                return isCart;
            } else{
                isCart.products[productID].number +=1;
                await isCart.save();
                return isCart;
            }

        }
    }

    async to_CartUser(email:string):Promise<any>{
        const user_cart = await this.CartModel.findOne({"email":email}).exec();
        const product = [];

        for(const productID of user_cart.products){
            product.push(await this.ProductModel.find(new Types.ObjectId(productID.id)).exec());
        }

        return product;

    }

}