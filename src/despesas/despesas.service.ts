import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
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
    console.log(new Date(Date.now()).toLocaleString().split(' ')[0])
    console.log(createExpenseDto)
    if(!userFinding){
      throw new NotFoundException(`Não foi possivel localizar Usuário`)
    }
    const newExpense = new this.categoriaModel(createExpenseDto);
    return await newExpense.save();
  }

  async updateExpense(updateExpenseDto: UpdateExpenseDto, params: string[]): Promise<void>{
    const _id = params['_id'];
    const idUser = params['idUser'];

    const user = await this.usuarioService.getUniqueUser(idUser);
    const compareUser = await this.compareUser(user._id, _id);

    if(compareUser){
      await this.categoriaModel.findOneAndUpdate({_id}, {$set: updateExpenseDto}).exec();
    }
  }

  async getAllExpense(_id: string): Promise<Array<Despesa>>{
    const user = await this.usuarioService.getUniqueUser(_id);

    let list = [];
    list.push(await this.categoriaModel.find({usuario: user._id}).exec());
    
    return list
  }

  async getSpecificExpense(params: string[]): Promise<Despesa>{
    const _id = params['_id'];
    const idUser = params['idUser'];

    const user = await this.usuarioService.getUniqueUser(idUser);
    const compareUser = await this.compareUser(user._id, _id);

    if(compareUser){
      return await this.categoriaModel.findOne({_id}).exec();
    }
  }

  async deleteExpense(params: string[]): Promise<void>{
    const _id = params['_id'];
    const idUser = params['idUser'];

    const user = await this.usuarioService.getUniqueUser(idUser);
    const compareUser = await this.compareUser(user._id, _id);
    
    if(compareUser){
      await this.categoriaModel.deleteOne({_id}).exec();
    }
  }

  private async findExpense(_id: string): Promise<Despesa>{
    const expense = await this.categoriaModel.findOne({_id}).exec();

    if(!expense){
      throw new BadRequestException("Não foi possivel encontrar esta despesa");
    }
    return expense;
  }

  private async compareUser(userId: string, expenseId: string): Promise<boolean>{
    const expense = await this.findExpense(expenseId);

    if(!expense.usuario._id.equals(userId)){
      throw new UnauthorizedException('Usuário não tem acesso a esta despesa');
    }
    return true
  }

}
