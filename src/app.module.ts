import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { DespesasModule } from './despesas/despesas.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:NRCpAAA7rqM9TATR@cluster0.bvgeaz2.mongodb.net/onfly?retryWrites=true&w=majority'),
    UsuarioModule, 
    DespesasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
