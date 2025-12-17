import { BadRequestException, Injectable } from "@nestjs/common";
import { UserDto } from "../dtos/users.dto";
import { InjectModel } from "@nestjs/mongoose";
import { UserShema } from "../schema/users.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { UserResponse } from "../response/users.response";
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
      
}