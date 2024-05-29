import { Module } from "@nestjs/common";
import { AccountModule } from "../accounts/account.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Module({
    imports:[AccountModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers:[AuthController],
    providers:[AuthService],
    exports:[AuthService],

})

export class AuthModule{}