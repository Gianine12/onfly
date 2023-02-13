import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Usuario } from 'src/usuario/interface/user.schema';

@Schema({
  timestamps: true
})
export class Despesa {
  @Prop({maxlength: 191})
  descricacao: string;

  @Prop()
  data: Date;

  @Prop()
  valor: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId ,
    ref: "Usuario"
  })
  usuario: Usuario;

  constructor(despesa?: Partial<Despesa>){
    this.data = despesa?.data;
    this.descricacao = despesa?.descricacao;
    this.usuario = despesa?.usuario;
    this.valor = despesa?.valor;
  }

}

export const DespesaSchema = SchemaFactory.createForClass(Despesa);