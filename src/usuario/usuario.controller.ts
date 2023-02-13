import { Controller, Post, Get, Delete, Put, Body, Param, UsePipes,ValidationPipe, UseGuards} from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Usuario } from './interface/usuario.interface';
import { UsuarioService } from './usuario.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService){}

  @Get('/login')
  async login(
    @Body() loginDto: LoginDto): Promise<{token:string}>{
    return await this.usuarioService.longin(loginDto);
  }

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

  @UseGuards(AuthGuard('jwt'))
  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updateUsers(
    @Body() updateUserDto: UpdateUserDto,
    @Param('_id') _id: string
  ): Promise<void>{
    return await this.usuarioService.updateUser(updateUserDto, _id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUsers(
    @Param('_id') _id: string
  ): Promise<void>{
    return this.usuarioService.deleteUser(_id)
  }

}
