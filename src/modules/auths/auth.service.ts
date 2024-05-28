import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AccountService } from "../accounts/account.service";
import { loginDTO } from "../accounts/creatAccount.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(
        private accountUser:AccountService,
        private jwtService: JwtService,

    ){};

    async singIn(account:loginDTO):Promise<{access_token:string, any}>{
        const user = await this.accountUser.accountLogin(account);
        if(!user){
            throw new UnauthorizedException();
        }

        delete user.password;
        const { ...result} = user;

        return result;
    }

}