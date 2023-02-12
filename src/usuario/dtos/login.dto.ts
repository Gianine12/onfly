import { IsNotEmpty, IsEmail, MinLength } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, {message: "Por favor entre com um e-mail valido."})
  readonly email: string;
  
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}