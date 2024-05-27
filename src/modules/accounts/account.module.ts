import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Account, AccountShema } from "../../models/account.model";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";

@Module({
    imports:[MongooseModule.forFeature([{name:Account.name,schema:AccountShema}])],
    controllers:[AccountController],
    providers:[AccountService],
    exports:[AccountService],
})

export class AccountModule{};