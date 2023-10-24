import { IsEmail, IsNotEmpty } from '@nestjs/class-validator';

export class Handler {

  @IsNotEmpty()
  @IsEmail()
  email: string;

}