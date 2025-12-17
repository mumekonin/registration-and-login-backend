import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto, UserDto } from "../dtos/users.dto";
import { UserService } from "../service/users.service";
import {JwtAuthGuard} from "src/users/common/guards/jwtAuth.guard"
@Controller('users')

export class UserController{
   constructor(
     private readonly userService:UserService
 ){}

    @Post('/register')
    async createUser(@Body() userDto:UserDto){
       const result = await this.userService.registerUser(userDto)
       return result;
    }
    @JwtAuthGuard()  
    @Post('login')
    async userlogin(@Body() loginDto:LoginDto){
      const result = await this.userService.userLogin(loginDto)
      return result;
    }
}