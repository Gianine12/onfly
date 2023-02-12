import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema({
  timestamps: true
})
export class Usuario {
  @Prop()
  name: string;

  @Prop()
  phoneNumber: string;

  @Prop({unique: true})
  email: string;

  @Prop({unique: true})
  password: string;

  @Prop()
  avatarUrl: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);