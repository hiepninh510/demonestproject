import { Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types} from "mongoose";
import { Cart } from "../../../src/models/cart.model";
import { Product } from "../../../src/models/product.model";
import { Cart_Product } from "../../../src/models/cart_product.model";

@Injectable()
export class CartService{
    constructor(@InjectModel(Cart.name) private CartModel:Model<any>,
        @InjectModel(Product.name) private ProductModel:Model<any>,
        @InjectModel(Cart_Product.name) private Cart_ProductModel:Model<any>,
    ){};

    async add_To_Cart(product:string, email:string):Promise<any>{
        const isCart = await this.CartModel.findOne({'email':email}).exec();
        if(!isCart){
            const cart = new this.CartModel();
            cart.email = email;
            await cart.save();
            const cart_product = new this.Cart_ProductModel();
            cart_product.email = cart.email;
            cart_product.product = product;
            await cart_product.save();
            return cart_product;
        } else{
            const cart_product = await this.Cart_ProductModel.findOne({"email":isCart.email,"product":product});
            if(!cart_product){
                const newProduct = new this.Cart_ProductModel();
                newProduct.email = isCart.email;
                newProduct.product = product;
                await newProduct.save();
                return newProduct;
            } else{
                cart_product.quality +=1;
                await cart_product.save();
                return cart_product;
            }
        }
    }

    async to_CartUser(email:string):Promise<any>{
        const cart_User = await this.Cart_ProductModel.find({"email":email}).exec();
        if(!cart_User){
            throw new Error('User cart not found');
        }
        const products:any[] = [];
            for(const cart of cart_User){
                const _product = await this.ProductModel.findById(new Types.ObjectId(cart.product));
                if(_product){
                    const productWithQuality = {
                        ..._product.toObject(),
                        quality:cart.quality
                    };
                    products.push(productWithQuality);
                } else {
                    console.error(`Product not found for ID: ${cart.product}`);
                }
            }
        return products;

    }

    async reduce_Number(id:any,email:string):Promise<any>{
        const carts = await this.Cart_ProductModel.find({"email":email}).exec();
        const products:any[]=[];
        for(const cart of carts){
            if(cart.product.trim() === id.trim()){
                if(cart.quality > 1){
                    cart.quality -=1;
                    await cart.save();
                    const product = await this.ProductModel.findById(new Types.ObjectId(cart.product)).exec();
                    const new_Product_In_Cart = {
                        ...product.toObject(),
                        quality:cart.quality};
                    products.push(new_Product_In_Cart);
                } else{
                   return await this.delete_Product(cart.product,email);

                }
            }
        }
        return products;
    }

    async delete_Product(id:any, email:string):Promise<any>{
        const cart_Need_Delete = await this.Cart_ProductModel.deleteOne({"email":email,"product":id.toString()}).exec();
        const carts = await this.Cart_ProductModel.find({"email":email}).exec();
        // const products:any[]=[];
        // for(const cart of carts){
        //     const product = await this.ProductModel.findById(new Types.ObjectId(cart.product)).exec();
        //     const result_Product = {
        //         ...product.toObject(),
        //         quality:cart.quality
        //     };
        //         products.push(result_Product);
        // }
        const products = await this.lam_Phang_Object(carts);
        return {cart_Need_Delete,products};
        
    }

    async lam_Phang_Object(arr:any):Promise<any>{
        const products:any[]=[];
        for(const item of arr){
            const product = await this.ProductModel.findById(new Types.ObjectId(item.product)).exec();
            const result_Product = {
                ...product.toObject(),
                quality:item.quality
            };
                products.push(result_Product);
        }
        return products;
    }
}  
    