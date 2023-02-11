import { Controller, Post, Get, Put, Delete, UsePipes, ValidationPipe, Body, Param } from '@nestjs/common';
import { DespesaService } from './despesas.service';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';
import { Despesa } from './interface/despesa.interface';

@Controller('api/despesas')
export class DespesaController {

  constructor(private readonly despesasService: DespesaService){}

  @Post()
  @UsePipes(ValidationPipe)
  async createExpenses(
    @Body() createExpenseDto: CreateExpenseDto){
    return await this.despesasService.createExpense(createExpenseDto);
  }

  @Get()
  async getAllExpenses(): Promise<Array<Despesa>>{
    return await this.despesasService.getAllExpense();
  }

  @Get('/:_id')
  async getSpecificExpenses(
    @Param('_id') _id: string
  ): Promise<Despesa>{
    return await this.despesasService.getSpecificExpense(_id);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updateExpenses(
    @Body() updateExpenseDto: UpdateExpenseDto,
    @Param('_id') _id: string
  ): Promise<void>{
    return await this.despesasService.updateExpense(updateExpenseDto, _id)
  }

  @Delete('/:_id')
  async deleteExpenses(
    @Param('_id') _id: string
  ): Promise<void>{
    return await this.despesasService.deleteExpense(_id);
  }
}
