import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
