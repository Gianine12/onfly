import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsuarioService } from 'src/usuario/usuario.service';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';
import { Despesa } from './interface/despesa.interface';

@Injectable()
export class DespesaService {
  constructor(@InjectModel('Despesa')
  private readonly categoriaModel: Model<Despesa>,
  private readonly usuarioService: UsuarioService
  ){}

  async createExpense(createExpenseDto: CreateExpenseDto ): Promise<Despesa>{
    const _id = createExpenseDto.usuario;
    const userFinding = await this.usuarioService.getUniqueUser(String(_id))
    
    if(!userFinding){
      throw new NotFoundException(`Não foi possivel localizar Usuário`)
    }
    const newExpense = new this.categoriaModel(createExpenseDto);
    return await newExpense.save();
  }

  async updateExpense(updateExpenseDto: UpdateExpenseDto, _id: string): Promise<void>{
    await this.categoriaModel.findOneAndUpdate({_id}, {$set: updateExpenseDto}).exec();
  }

  async getAllExpense(): Promise<Array<Despesa>>{
    return await this.categoriaModel.find().exec();
  }

  async getSpecificExpense(_id: string): Promise<Despesa>{
    return await this.categoriaModel.findOne({_id}).exec();
  }

  async deleteExpense(_id: string): Promise<void>{
    await this.categoriaModel.deleteOne({_id}).exec();
  }

}
