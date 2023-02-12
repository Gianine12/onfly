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

  constructor(usuario?: Partial<Usuario>){
    this.email = usuario?.email;
    this.avatarUrl = usuario?.avatarUrl;
    this.name = usuario?.name;
    this.password = usuario?.password;
    this.phoneNumber = usuario?.phoneNumber;
  }

}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);