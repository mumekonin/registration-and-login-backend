import { IsAlpha, IsEmail, IsNotEmpty, IsString } from "class-validator";
export class UserDto{
@IsString()
@IsAlpha()
firstName:string;
@IsString()
@IsAlpha()
lastName:string;
@IsString()
username:string;
@IsString()
password:string;
@IsEmail({},{message:"invalid email format"})
email:string;
}

export class LoginDto{
@IsString()
@IsNotEmpty()
username:string;
@IsString()
@IsNotEmpty()
password:string;
}