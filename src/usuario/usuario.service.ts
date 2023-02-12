import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Usuario } from './interface/usuario.interface';
import { hashSync, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class UsuarioService {
  constructor(@InjectModel('Usuario') 
  private readonly usuarioModel: Model<Usuario>,
  private readonly jwtService: JwtService
  ){}

  async createUser(createUserDto: CreateUserDto): Promise<Usuario>{
    const { email, password } = createUserDto;

    createUserDto.password = await this.criptPassword(password);

    const userFinding = await this.usuarioModel.findOne({email}).exec();
    
    if(userFinding){
      throw new BadRequestException(`Usuário com email: ${email} já cadastrado`);
    }

    const newUser = new this.usuarioModel(createUserDto);
    return await newUser.save();
  }

  async longin(loginDto: LoginDto): Promise<{token:string}>{
    const { email, password } = loginDto;

    const user = await this.usuarioModel.findOne({email}).exec();
    if(!user){
      throw new UnauthorizedException("Usuário não encontrado");
    }

    const payload = {sub: user._id, email: user.email};
    
    const isPassword = await compare(password, user.password);
    if(!isPassword){
      throw new UnauthorizedException("E-mail ou senha invalido");
    }

    const token = this.jwtService.sign(payload);
    return {token};
  }

  async getAllUser(): Promise<Array<Usuario>>{
    return await this.usuarioModel.find().exec();
  }

  async getUniqueUser(_id: string): Promise<Usuario>{
    return await this.validadeExistUser(_id);
  }

  async findOneEmail(email: string): Promise<Usuario>{
    const user = await this.usuarioModel.findOne({email}).exec();
    if(!user){
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
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

  private async criptPassword(password: string): Promise<string>{
    const newPassword = hashSync(password, 10);
    
    return newPassword;
  }
}
