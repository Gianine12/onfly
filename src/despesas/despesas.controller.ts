import { Controller, Post, Get, Put, Delete, UsePipes, ValidationPipe, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DespesaService } from './despesas.service';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';
import { Despesa } from './interface/despesa.interface';

@Controller('api/despesas')
@UseGuards(AuthGuard('jwt'))
export class DespesaController {

  constructor(private readonly despesasService: DespesaService){}

  @Post()
  @UsePipes(ValidationPipe)
  async createExpenses(
    @Body() createExpenseDto: CreateExpenseDto,
    ) {
    return await this.despesasService.createExpense(createExpenseDto);
  }

  @Get("/all/:_id")
  async getAllExpenses(
    @Param('_id') _id: string
  ): Promise<Array<Despesa>>{
    return await this.despesasService.getAllExpense(_id);
  }

  @Get('/:_id/usuario/:idUser')
  async getSpecificExpenses(
    @Param() params: string[]
  ): Promise<Despesa>{
    return await this.despesasService.getSpecificExpense(params);
  }

  @Put('/:_id/usuario/:idUser')
  @UsePipes(ValidationPipe)
  async updateExpenses(
    @Body() updateExpenseDto: UpdateExpenseDto,
    @Param() params: string[]
  ): Promise<void>{
    return await this.despesasService.updateExpense(updateExpenseDto, params)
  }

  @Delete('/:_id/usuario/:idUser')
  async deleteExpenses(
    @Param() params: string[]
  ): Promise<void>{
    return await this.despesasService.deleteExpense(params);
  }
}
