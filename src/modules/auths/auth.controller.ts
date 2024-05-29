import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { loginDTO, registerDTO } from "../accounts/creatAccount.dto";

@Controller("auth")
export class AuthController{
    constructor(private authService: AuthService){}
    
    @HttpCode(HttpStatus.OK)
    @Post("login")
    async singIn(@Body() accountLogin:loginDTO):Promise<any>{
        return this.authService.singIn(accountLogin);
    }

    @HttpCode(HttpStatus.OK)
    @Post("register")
    async register(@Body() register:registerDTO):Promise<any>{
        return this.authService.register(register);
    }

}