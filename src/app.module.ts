import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './modules/products/product.module';
import { AccountModule } from './modules/accounts/account.module';



@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/QuanLyBanHang'),
  ProductModule,
  AccountModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
