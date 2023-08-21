import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Users } from './schema/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private usersModel: Model<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const users = new this.usersModel(createUserDto);
      const createdUsers = await users.save();
      return createdUsers;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.usersModel.findOne({ _id: id });
      return user;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
