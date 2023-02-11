import { Usuario } from "src/usuario/interface/usuario.interface";
import {IsNotEmpty, IsDateString} from 'class-validator';

export class CreateExpenseDto{
  @IsNotEmpty()
  descricacao: string;

  @IsDateString()
  data: Date;

  @IsNotEmpty()
  valor: Number;

  usuario: Usuario
}