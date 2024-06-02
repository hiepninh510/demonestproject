import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AccountService } from "../accounts/account.service";
import { loginDTO, registerDTO } from "../accounts/creatAccount.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(
        private accountUser:AccountService,
        private jwtService: JwtService,

    ){};

    async singIn(account:loginDTO):Promise<{access_token:string}>{
        const user = await this.accountUser.accountLogin(account);
        if(!user){
            throw new UnauthorizedException();
        }
        const payload = {sub: user.id, email:user.email};
        return {access_token:await this.jwtService.signAsync(payload)};
    }

    async register(accountRegister:registerDTO):Promise<{access_token:string}>{
        const user = await this.accountUser.accountRegister(accountRegister);
        if(!user){
            throw new UnauthorizedException();
        }

        const payload = {sub:user.id,email:user.email};
        return {access_token:await this.jwtService.signAsync(payload)}
    }

}