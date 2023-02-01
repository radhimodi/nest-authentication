import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from 'src/dto/user/create-user.input';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    try {
      const user = new this.userModel(createUserInput);
      return user.save();
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findAll() {
    try {
      const user = await this.userModel.find();
      if (!user) {
        return 'User not found';
      }
      return user;
    } catch (error) {
      return new Error(error.message);
    }
  }

  async login() {
    try {
      const user = await this.userModel.find();
      if (!user) {
        return 'User not found';
      }
      return user;
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findOne(condition) {
    try {
      const user = await this.userModel.findOne(condition);
      return user;
    } catch (error) {
      return new Error(error.message);
    }
  }
 
}
