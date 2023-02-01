import { Module } from '@nestjs/common';
import { User, UserSchema} from '../../entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema}
    ])
  ],
  providers: [UserResolver, UserService]
})
export class UserModule {}
