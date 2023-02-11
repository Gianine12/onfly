import { Module } from '@nestjs/common';
import { DespesaController } from './despesas.controller';
import { DespesaService } from './despesas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DespesaSchema } from './interface/despesa.schema';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: "Despesa", schema: DespesaSchema}]),
    UsuarioModule
  ],
  controllers: [DespesaController],
  providers: [DespesaService]
})
export class DespesasModule {}
