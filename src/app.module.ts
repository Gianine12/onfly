import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { DespesasModule } from './despesas/despesas.module';

@Module({
  imports: [UsuarioModule, DespesasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
