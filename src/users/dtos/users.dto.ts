import { IsAlpha, IsString } from "class-validator";
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
@IsString()
email:string;
}