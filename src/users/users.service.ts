import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { User, UsersDocument } from 'src/schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UsersDocument>,
  ) {}

  //Log in
  async login(loginUserDto: LoginUserDto): Promise<User | null> {
    const user = await this.userModel.collection.findOne({
      username: loginUserDto.username,
    });

    if (!user) {
      return null;
    }

    return user as User;
  }

  //Registration
  async registration(createUserDto: CreateUserDto): Promise<User | null> {
    const existingUser = await this.userModel.collection.findOne({
      username: createUserDto.username,
    });
    if (existingUser) {
      return null;
    }
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }
}
