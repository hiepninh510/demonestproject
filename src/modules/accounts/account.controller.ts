import { Body, Controller, Post } from "@nestjs/common";
import { AccountService } from "./account.service";
import { loginDTO, registerDTO } from "./creatAccount.dto";

@Controller("account")
    export class AccountController{
        constructor(private readonly accountService:AccountService){};

        @Post("login")
        async accountLogin(@Body() account:loginDTO):Promise<any>{
            return this.accountService.accountLogin(account);
        };

        @Post("register")
        async accountRegister(@Body() account:registerDTO):Promise<any>{
            return this.accountService.accountRegister(account);
        }

    };
