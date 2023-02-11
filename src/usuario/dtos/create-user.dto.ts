import { IsOptional, IsNotEmpty, IsPhoneNumber, IsString, IsEmail } from "class-validator";

export class CreateUserDto {
  @IsEmail()  
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  password: string;

  @IsOptional()
  avatarUrl: string;
}