import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "../../models/product.model";

@Injectable()
export class ProductService{
    constructor(@InjectModel(Product.name) private productModel:Model<Product>){};

    async getAllProducts():Promise<Product[]>{
        return this.productModel.find().exec();
    }
}