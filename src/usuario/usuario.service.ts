import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Usuario } from './interface/usuario.interface';

@Injectable()
export class UsuarioService {
  constructor(@InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>){}

  async createUser(createUserDto: CreateUserDto): Promise<Usuario>{
    const { email } = createUserDto;

    const userFinding = await this.usuarioModel.findOne({email}).exec();
    
    if(userFinding){
      throw new BadRequestException(`Usuário com email: ${email} já cadastrado`);
    }
    const newUser = new this.usuarioModel(createUserDto);
    return await newUser.save();
  }

  async getAllUser(): Promise<Array<Usuario>>{
    return await this.usuarioModel.find().exec();
  }

  async getUniqueUser(_id: string): Promise<Usuario>{
    return await this.validadeExistUser(_id);
  }

  async updateUser(updateUserDto: UpdateUserDto, _id: string): Promise<void>{
    await this.validadeExistUser(_id);

    await this.usuarioModel.findOneAndUpdate({_id},{$set: updateUserDto}).exec();

  }

  async deleteUser(_id: string): Promise<void>{ // Promise<any>
    await this.validadeExistUser(_id);
    await this.usuarioModel.deleteOne({_id}).exec();
  }

  private async validadeExistUser(_id: string): Promise<Usuario>{
    const userFinding = await this.usuarioModel.findOne({_id}).exec();

    if(!userFinding){
      throw new NotFoundException(`Usuário não foi encontrado`);
    };

    return userFinding;
  }
}
