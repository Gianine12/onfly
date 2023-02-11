import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:NRCpAAA7rqM9TATR@cluster0.bvgeaz2.mongodb.net/onfly?retryWrites=true&w=majority')],
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule {}
