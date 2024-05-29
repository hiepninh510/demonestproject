import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { loginDTO } from "../accounts/creatAccount.dto";

@Controller("auth")
export class AuthController{
    constructor(private authService: AuthService){}
    
    @HttpCode(HttpStatus.OK)
    @Post("login")
    async singIn(@Body() accountLogin:loginDTO):Promise<any>{
        return this.authService.singIn(accountLogin);
    }

}