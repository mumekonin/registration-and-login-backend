import { Schema ,Prop, SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps:true})
export class UserShema extends Document{
  @Prop()
  firstName:string
  @Prop()
  lastName:string
  @Prop()
  username:string
  @Prop()
  password:string
  @Prop()
  email:string
}
export const userschema = SchemaFactory.createForClass(UserShema) 