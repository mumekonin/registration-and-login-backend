import { Module } from "@nestjs/common";
import { UserService } from "./service/users.service";
import{UserController} from "./controller/users.controller"
import { MongooseModule } from "@nestjs/mongoose";
import { UserShema,userschema } from "./schema/users.schema";
import { JwtStrategy } from "./common/guards/jwt.strategy";
@Module({
  imports: [
     MongooseModule.forFeature([
      { name: UserShema.name, schema:userschema }
  
    ]),
  ],
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
})
export class userModule{}
