import { HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserDataTransferObject } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/common/models';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly model: Model<IUser>) {}

  async findByUsername(username: string) {
    return await this.model.findOne({ username }).exec()
  }

  async checkPassword(plainPassword: string, encryptPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, encryptPassword)
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async create(body: UserDataTransferObject): Promise<IUser> {
    const hash = await this.hashPassword(body.password);
    const user = new this.model({ ... body, password: hash})
    return await user.save()
  }

  async findAll(): Promise<IUser[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<IUser> {
    return await this.model.findById(id).exec();
  }

  async update(id: string, body: UserDataTransferObject): Promise<IUser> {
    const hash = await this.hashPassword(body.password)
    const user = { ...body, password: hash }
    return await this.model.findByIdAndUpdate(id, user, { new: true }).exec()
  }

  async delete(id: string): Promise<{ status: number, message: string }> {
    await this.model.findByIdAndDelete(id).exec()
    return { status: HttpStatus.OK, message: 'Record deleted.' }
  }
}
