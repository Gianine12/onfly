import { Test, TestingModule } from '@nestjs/testing';
import { DespesaController } from './despesas.controller';
import { DespesaService } from './despesas.service';
import { Despesa } from './interface/despesa.schema';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';

const newUsuario = {name: "Gianine", avatarUrl : "" ,password: "Gianine123", email: "gianine@teste.com", phoneNumber: "31982656513"};

const listaDespesas: Despesa[] = [
 new Despesa({descricacao: "conta de luz", usuario: newUsuario , valor: 5, data: new Date(Date.now())}),
 new Despesa({descricacao: "conta de agua", usuario: newUsuario , valor: 15, data: new Date(Date.now()-1)}),
] 

const updateExpense: UpdateExpenseDto = {descricacao: " conta para pagar", valor: 10, data: new Date(Date.now())};

describe('DespesaController', () => {
  let despesaController: DespesaController;
  let despesaService: DespesaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DespesaController],
      providers: [
        {
          provide: DespesaService,
          useValue:{
            createExpense: jest.fn().mockResolvedValue(listaDespesas[0]),
            getAllExpense: jest.fn().mockResolvedValue(listaDespesas),
            getSpecificExpense: jest.fn().mockResolvedValue(listaDespesas[0]),
            updateExpense: jest.fn().mockResolvedValue(updateExpense),
            deleteExpense: jest.fn().mockResolvedValue(undefined)
          }
        }
      ]
    }).compile();

    despesaController = module.get<DespesaController>(DespesaController);
    despesaService = module.get<DespesaService>(DespesaService);
  });

  it('should be defined', () =>{
    expect(despesaController).toBeDefined();
    expect(despesaService).toBeDefined();
  });

  describe('getAllExpenses' , () => {
    it('Sucesso, deve retornar uma lista de despesas', async() =>{
      // Arrange
      const result = await despesaController.getAllExpenses('1');
      // Act
      // Assert
      expect(result).toEqual(listaDespesas);
      expect(typeof result).toEqual('object');
      expect(despesaService.getAllExpense).toHaveBeenCalledTimes(1);
    });

    it('Error, não deve retornar uma lista de despesas', () =>{
      // Arrange
      jest.spyOn(despesaService, 'getAllExpense').mockRejectedValueOnce(new Error());

      // Assert
      expect(despesaController.getAllExpenses('1')).rejects.toThrowError();
    });
  });


  // describe('createExpenses', () => {
  //   it('Sucesso, foi possivel criar uma despesa', async () => {
  //   });

  //   it('Error, não foi possivel criar uma despesa', () =>{
  //   });
  //   });
    
  // });

  // describe('getSpecificExpenses', () => {
  //   it('Sucesso, a buscar uma despesa', async () => {
  //   });

  //   it('Error, não consegue buscar uma despesa', () =>{
  //   });
  // });

  // describe('updateExpenses', () => {
  //   it('Sucesso, deve atualizar um despesa', async () => {
  //   });

  //   it('Error, não consegue atualizar o usuario', () =>{
  //   });
  // });

  // describe('deleteExpenses', () => {
  //   it('Sucesso, foi possivel deletar um despesa', async () => {
  //   });

  //   it('Error, não foi possivel deletar o usuario', () =>{
  //   });
  // });
});