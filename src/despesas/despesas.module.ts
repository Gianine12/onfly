import { Module } from '@nestjs/common';
import { DespesaController } from './despesas.controller';
import { DespesaService } from './despesas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DespesaSchema } from './interface/despesa.schema';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ConfigModule} from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: {expiresIn: '60s'}
    }),
    MongooseModule.forFeature([{name: "Despesa", schema: DespesaSchema}]),
    UsuarioModule
  ],
  controllers: [DespesaController],
  providers: [DespesaService]
})
export class DespesasModule {}
