import { BadRequestException, Injectable } from "@nestjs/common";
import { UserDto ,LoginDto} from "../dtos/users.dto";
import { InjectModel } from "@nestjs/mongoose";
import { UserShema } from "../schema/users.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { UserResponse } from "../response/users.response";
import { CommmonUtils } from "../common/utils";
@Injectable()
export class UserService{
      constructor(
        @InjectModel(UserShema.name)
        private readonly userModel:Model<UserShema>
      ){} 
     async registerUser(userDto:UserDto){
          //check if the user exists
          const existingName =  await this.userModel.findOne({
              username:userDto.username.toLowerCase()
          })
          if(existingName){
            throw new BadRequestException("user already exists with this username")
          }
          const existingEmail = await this.userModel.findOne({
            email:userDto.email.toLowerCase()
          })
          if(existingEmail){
            throw new BadRequestException("user already exists with this email")
          }
         //hash password
         const hashedPassword =await bcrypt.hash(userDto.password,10)
         //preparing  an instance to save in data base
         const newUser = new this.userModel({
          firstName:userDto.firstName,
          lastName:userDto.lastName,
          username:userDto.username,
          password:hashedPassword,
          email:userDto.email
         })
         const savedUser = await newUser.save();
         //map to our user response  interceptor
         const userResponse:UserResponse={
            firstName:savedUser.firstName,
            lastName:savedUser.lastName,
            username:savedUser.username,
            email:savedUser.email
         }
         return userResponse;
      } 
      async userLogin(loginDto:LoginDto){
       const user = await this.userModel.findOne({
        username:loginDto.username.toLowerCase()
       }) ;
       if(!user){
        throw new BadRequestException("invalid username");
       }
       //compere the password
       const isPwdMatch = await  bcrypt.compare(loginDto.password,user.password);
       if(!isPwdMatch){
          throw new BadRequestException("invalid password");
      }
      const jwtData={
        firstName:user.firstName,
        lastName:user.lastName,
        username:user.username 
      };
      const generateJwtToken = CommmonUtils.generateJwtToken(jwtData)
      return {
        assesToken:generateJwtToken
      }
   }
}