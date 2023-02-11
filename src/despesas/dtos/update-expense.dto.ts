import {IsNumber, IsOptional, IsDateString, IsString} from 'class-validator';

export class UpdateExpenseDto{
  @IsString()
  descricacao: string;

  @IsDateString()
  @IsOptional()
  data: Date

  @IsNumber()
  @IsOptional()
  valor: number
}