import { Controller, Post, Get, Delete, Put, Body, Param, UsePipes,ValidationPipe} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Usuario } from './interface/usuario.interface';
import { UsuarioService } from './usuario.service';

@Controller('api/usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService){}

  @Post()
  @UsePipes(ValidationPipe)
  async createUsers(
    @Body() createuserDto: CreateUserDto){
    return await this.usuarioService.createUser(createuserDto);
  }

  @Get()
  async getAllUsers(): Promise<Array<Usuario>>{
    return await this.usuarioService.getAllUser();
  }

  @Get('/:_id')
  async getSpecificUsers(
    @Param('_id') _id: string): Promise<Usuario>{
    return await this.usuarioService.getUniqueUser(_id);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updateUsers(
    @Body() updateUserDto: UpdateUserDto,
    @Param('_id') _id: string
  ): Promise<void>{
    return await this.usuarioService.updateUser(updateUserDto, _id);
  }

  @Delete('/:_id')
  async deleteUsers(
    @Param('_id') _id: string
  ): Promise<void>{
    return this.usuarioService.deleteUser(_id)
  }

}
