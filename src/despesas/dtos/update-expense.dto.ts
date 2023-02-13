import {IsNumber, IsOptional, IsDateString, IsString, IsNotEmpty, MaxLength} from 'class-validator';

export class UpdateExpenseDto{
  @IsNotEmpty()
  @IsString()
  @MaxLength(191)
  descricacao: string;

  @IsDateString()
  @IsOptional()
  data: Date

  @IsNumber()
  @IsOptional()
  valor: number
}