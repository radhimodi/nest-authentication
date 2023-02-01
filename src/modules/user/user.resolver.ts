import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/dto/user/create-user.input';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import * as crypto from 'crypto';
import { LoginInput } from 'src/dto/user/login.input';
import { SigninUser } from 'src/entities/signinUser.entity';
const jwt = require('jsonwebtoken');

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createRegister(@Args('data') data: CreateUserInput) {
    if (!data.firstName || !data.lastName || !data.email || !data.password) {
      throw new Error('Require Parameter Missing!');
    }
    const userDetail = await this.userService.findOne({ email: data.email });
    if (userDetail) {
      throw new Error('Email already exist!');
    }
    data['password'] = crypto
      .createHash('md5')
      .update(data.password)
      .digest('hex');
    return this.userService.create(data);
  }

  @Query(() => [User])
  async findAll() {
    return await this.userService.findAll();
  }

  @Query(() => SigninUser)
  async loginUser(@Args('data', { nullable: true }) data: LoginInput) {
    const userDetail = await this.userService.findOne({ email: data.email });
    if (!userDetail) {
      throw new Error('Record not found!');
    }
    if (
      userDetail['password'] !=
      crypto.createHash('md5').update(data.password).digest('hex')
    ) {
      throw new Error('Incorrect Password!');
    }
    let userToken = jwt.sign({ _id: userDetail['_id'] }, 'jwtreact', {
      expiresIn: '1w',
    });
    let userData = {
      _id: userDetail['_id'],
      accessToken: userToken,
    };
    return userData;
  }
}
