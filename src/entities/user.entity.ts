import { ObjectType, Field, Int} from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(({nullable: true}))
  firstName: string;

  @Prop()
  @Field(({nullable: true}))
  lastName: string;

  @Prop()
  @Field(({nullable: true}))
  email: string;

  @Prop()
  @Field(({nullable: true}))
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
