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
      const result = await despesaController.getAllExpenses();
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
      expect(despesaController.getAllExpenses()).rejects.toThrowError();
    });
  });


  // describe('createExpenses', () => {
  //   it('Sucesso, deve criar um usuario', async () => {
  //     const corpo: CreateUserDto = {name: "Gianine", avatarUrl : "" ,password: "Gianine123", email: "gianine@teste.com", phoneNumber: "31982656513"}
  //     const result = await usuarioController.createUsers(corpo);

  //     expect(result).toEqual(newUsuario);
  //     expect(usuarioService.createUser).toHaveBeenCalledTimes(1);
  //     expect(usuarioService.createUser).toHaveBeenCalledWith(corpo);
  //   });

  //   it('Error, não deve criar um usuario', () =>{
  //     const corpo: CreateUserDto = {name: "Gianine", avatarUrl : "" ,password: "Gianine123", email: "gianine@teste.com", phoneNumber: "31982656513"}
  //     jest.spyOn(usuarioService, 'createUser').mockRejectedValueOnce(new Error());
  //     expect(usuarioController.createUsers(corpo)).rejects.toThrowError();
  //   });
    
  // });

  // describe('getSpecificExpenses', () => {
  //   it('Sucesso, buscar um usuario', async () => {
  //     const result = await usuarioController.getSpecificUsers('1');
  //     // Act
  //     // Assert
  //     expect(result).toEqual(listaUsuarios[0]);
  //   });

  //   it('Error, não deve encontrar o usuarios', () =>{
  //     jest.spyOn(usuarioService, 'getUniqueUser').mockRejectedValueOnce(new Error());
  //     expect(usuarioController.getSpecificUsers('1')).rejects.toThrowError();
  //   });
  // });

  // describe('updateExpenses', () => {
  //   it('Sucesso, deve atualizar um usuario', async () => {
  //     const result = await usuarioController.updateUsers(listaUsuarios[0],'1');

  //     expect(result).toEqual(updateUser);
  //     expect(usuarioService.updateUser).toHaveBeenCalledWith(listaUsuarios[0],'1')
  //   });

  //   it('Error, não consegue atualizar o usuario', () =>{
  //     jest.spyOn(usuarioService, 'updateUser').mockRejectedValueOnce(new Error());
  //     expect(usuarioController.updateUsers(listaUsuarios[0],'1')).rejects.toThrowError();
  //   });
  // });

  // describe('deleteExpenses', () => {
  //   it('Sucesso, deletou um usuario', async () => {
  //     const result = await usuarioController.deleteUsers('1');
  //     expect(result).toBeUndefined();
  //   });

  //   it('Error, não foi possivel deletar um usuarios', () =>{
  //     jest.spyOn(usuarioService, 'deleteUser').mockRejectedValueOnce(new Error());
  //     expect(usuarioController.deleteUsers('1')).rejects.toThrowError();
  //   });
  // });
});