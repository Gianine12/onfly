import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { Usuario } from './interface/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

const listaUsuarios: Usuario[] = [
 new Usuario({name: "Gianine", password: "Gianine123", email: "gianine@teste.com", phoneNumber: "31982656513"}),
 new Usuario({name: "Gustavo", password: "Gustavo123", email: "Gustavo@teste.com", phoneNumber: "31982656514"}),
 new Usuario({name: "Bruno", password: "Bruno123", email: "Bruno@teste.com", phoneNumber: "31982656515"}),
] 

const newUsuario = new Usuario({name: "Gianine", avatarUrl : "" ,password: "Gianine123", email: "gianine@teste.com", phoneNumber: "31982656513"});

const updateUser: UpdateUserDto = {name: "Gianine R B C", avatarUrl:"" ,phoneNumber: "31982656513"};

describe('UsuarioController', () => {
  let usuarioController: UsuarioController;
  let usuarioService: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        {
          provide: UsuarioService,
          useValue:{
            longin: jest.fn(),
            createUser: jest.fn().mockResolvedValue(newUsuario),
            getAllUser: jest.fn().mockResolvedValue(listaUsuarios),
            getUniqueUser: jest.fn().mockResolvedValue(listaUsuarios[0]),
            updateUser: jest.fn().mockResolvedValue(updateUser),
            deleteUser: jest.fn().mockResolvedValue(undefined)
          }
        }
      ]
    }).compile();

    usuarioController = module.get<UsuarioController>(UsuarioController);
    usuarioService = module.get<UsuarioService>(UsuarioService);
  });

  it('should be defined', () =>{
    expect(usuarioController).toBeDefined();
    expect(usuarioService).toBeDefined();
  });

  describe('getAllUsers' , () => {
    it('Sucesso, deve retornar uma lista de usuarios', async() =>{
      // Arrange
      const result = await usuarioController.getAllUsers();
      // Act
      // Assert
      expect(result).toEqual(listaUsuarios);
      expect(typeof result).toEqual('object');
      expect(usuarioService.getAllUser).toHaveBeenCalledTimes(1);
    });

    it('Error, não deve retornar uma lista de usuarios', () =>{
      // Arrange
      jest.spyOn(usuarioService, 'getAllUser').mockRejectedValueOnce(new Error());

      // Assert
      expect(usuarioController.getAllUsers()).rejects.toThrowError();
    });
  });


  describe('createUser', () => {
    it('Sucesso, deve criar um usuario', async () => {
      const corpo: CreateUserDto = {name: "Gianine", avatarUrl : "" ,password: "Gianine123", email: "gianine@teste.com", phoneNumber: "31982656513"}
      const result = await usuarioController.createUsers(corpo);

      expect(result).toEqual(newUsuario);
      expect(usuarioService.createUser).toHaveBeenCalledTimes(1);
      expect(usuarioService.createUser).toHaveBeenCalledWith(corpo);
    });

    it('Error, não deve criar um usuario', () =>{
      const corpo: CreateUserDto = {name: "Gianine", avatarUrl : "" ,password: "Gianine123", email: "gianine@teste.com", phoneNumber: "31982656513"}
      jest.spyOn(usuarioService, 'createUser').mockRejectedValueOnce(new Error());
      expect(usuarioController.createUsers(corpo)).rejects.toThrowError();
    });
    
  });

  describe('getUniqueUser', () => {
    it('Sucesso, buscar um usuario', async () => {
      const result = await usuarioController.getSpecificUsers('1');
      // Act
      // Assert
      expect(result).toEqual(listaUsuarios[0]);
    });

    it('Error, não deve encontrar o usuarios', () =>{
      jest.spyOn(usuarioService, 'getUniqueUser').mockRejectedValueOnce(new Error());
      expect(usuarioController.getSpecificUsers('1')).rejects.toThrowError();
    });
  });

  describe('updateUser', () => {
    it('Sucesso, deve atualizar um usuario', async () => {
      const result = await usuarioController.updateUsers(listaUsuarios[0],'1');

      expect(result).toEqual(updateUser);
      expect(usuarioService.updateUser).toHaveBeenCalledWith(listaUsuarios[0],'1')
    });

    it('Error, não consegue atualizar o usuario', () =>{
      jest.spyOn(usuarioService, 'updateUser').mockRejectedValueOnce(new Error());
      expect(usuarioController.updateUsers(listaUsuarios[0],'1')).rejects.toThrowError();
    });
  });

  describe('deleteUser', () => {
    it('Sucesso, deletou um usuario', async () => {
      const result = await usuarioController.deleteUsers('1');
      expect(result).toBeUndefined();
    });

    it('Error, não foi possivel deletar um usuarios', () =>{
      jest.spyOn(usuarioService, 'deleteUser').mockRejectedValueOnce(new Error());
      expect(usuarioController.deleteUsers('1')).rejects.toThrowError();
    });
  });
});