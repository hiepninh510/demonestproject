import { Injectable, Param } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "../../models/product.model";

@Injectable()
export class ProductService{
    constructor(@InjectModel(Product.name) private productModel:Model<any>){};

    async getAllProducts():Promise<any[]>{
        return this.productModel.find().exec();
    }

    async getByProductID(@Param('id') id:string):Promise<any>{
        return await this.productModel.findById(id).exec();
    }

}