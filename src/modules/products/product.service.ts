import { Injectable,} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types} from "mongoose";
import { Product } from "../../models/product.model";
import { CartService } from "../carts/cart.service";

@Injectable()
export class ProductService{
    constructor(
        @InjectModel(Product.name) private productModel:Model<any>,
        private cartService:CartService,
    ){};

    async getAllProducts():Promise<any[]>{
        return this.productModel.find().exec();
    }

    async getByProductID(id:string):Promise<any>{
        return await this.productModel.findById(id).exec();
    }

    async pagination(page:string):Promise<any[]>{
        const products = await this.getAllProducts();

        const number = 2;
        const start_Cut = 2*(parseInt(page)-1);
        const end_Cut = start_Cut + number;
        const arr_products = products.slice(start_Cut,end_Cut);
    
        return arr_products;
    }


    async add_Product_To_Cart(id:string,email:string):Promise<any>{
        const product = await this.productModel.findById(new Types.ObjectId(id)).exec();
        console.log(typeof(product.id));
        if(product){
            const message = await this.cartService.add_To_Cart(product.id,email);
            return message?message:"Không tồn tại";
            
        }
    }



}