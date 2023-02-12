import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { DespesasModule } from './despesas/despesas.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.URL_MONGOOSE ),
    UsuarioModule, 
    DespesasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
