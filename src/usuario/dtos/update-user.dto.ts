import { IsOptional, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  readonly phoneNumber: string;
  
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  readonly avatarUrl: string;
}