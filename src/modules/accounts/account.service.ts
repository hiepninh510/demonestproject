import { Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { loginDTO, registerDTO } from "./creatAccount.dto";
import { Account } from "../../models/account.model";


@Injectable()
    export class AccountService{
        constructor(@InjectModel(Account.name) private accountModel:Model<Account>){};

    async accountLogin(account:loginDTO):Promise<Account>{
        const login = await this.accountModel.findOne({"email":account.email,"password":account.password})
        return login;
    }

    async accountRegister(account:registerDTO):Promise<Account>{
        const register = await this.accountModel.findOne({"email":account.email,"password":account.password});
        const data = new this.accountModel();
            if(!register){
                data.email = account.email;
                data.password = account.password;
                data.username = account.username;
                
                const result = await data.save();
                return result;
            }
            data.email="Email đã tồn tại!";
            data.password="Pasword đã tồn tại!";
            data.username="";

            return data;
    }
};