import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto';
import { IUser } from 'src/common';
import { UserTransformer } from './transformer';
import * as dayjs from 'dayjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    return UserTransformer.transformerToUser(
      await new this.userModel({
        ...createUserDto,
        joinedDate: dayjs().format('DD-MM-YYYY HH:mm'),
      }).save(),
    );
  }

  async update(updateUserDto: UpdateUserDto): Promise<IUser> {
    const updateData = this.sanitizeUpdateData(updateUserDto);
    const updatedUser = await this.userModel.findByIdAndUpdate(
      updateUserDto.id,
      { $set: updateData },
      { new: true },
    );

    return UserTransformer.transformerToUser(updatedUser);
  }

  private sanitizeUpdateData(updateUserDto: UpdateUserDto): Partial<UpdateUserDto> {
    const allowedFields = ['name', 'email', 'password']; // Add all allowed fields here
    const sanitizedData: Partial<UpdateUserDto> = {};
    for (const key of allowedFields) {
      if (key in updateUserDto) {
        sanitizedData[key] = updateUserDto[key];
      }
    }
    return sanitizedData;
  }

  async getUsers(): Promise<IUser[]> {
    const users = await this.userModel.find();

    return users.map((user) => UserTransformer.transformerToUser(user));
  }

  async getUser(id: string): Promise<IUser> {
    const user = await this.userModel.findById(id);

    return UserTransformer.transformerToUser(user);
  }

  async deleteUser(id: string): Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);

    return UserTransformer.transformerToUser(deletedUser);
  }
}
