import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsuarioSchema } from './interface/user.schema';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule} from '@nestjs/config';
import { JwtStrategies } from './strategies/jwt.strategies';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: {expiresIn: '600s'}
    }),
    MongooseModule.forFeature([{name: 'Usuario', schema: UsuarioSchema}]),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, JwtStrategies],
  exports: [UsuarioService]
})
export class UsuarioModule {}
