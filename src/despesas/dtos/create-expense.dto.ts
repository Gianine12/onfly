import { Usuario } from "src/usuario/interface/usuario.interface";
import {IsNotEmpty, IsDateString, IsString, MaxLength, MaxDate, IsISO8601, maxDate} from 'class-validator';

export class CreateExpenseDto{
  @IsNotEmpty()
  @IsString()
  @MaxLength(191)
  descricacao: string;

  @IsDateString()
  data: Date;

  @IsNotEmpty()
  valor: Number;

  usuario: Usuario
}