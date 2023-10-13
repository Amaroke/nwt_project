import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
  } from '@nestjs/class-validator';
  import { ApiProperty} from '@nestjs/swagger';
  
  export class CreateUserDto {

    @ApiProperty({
        name: 'firstname',
        description: 'Firstname',
        example: 'Louis',
      })
      @IsString()
      @IsNotEmpty()
      firstname: string;

     
    @ApiProperty({
        name: 'lastname',
        description: 'Lastname',
        example: 'Jacques',
    })
    @IsString()
    @IsNotEmpty()
    lastname: string;  

    @ApiProperty({
        name: 'email',
        description: 'Email',
        example: 'Louis.Jacques@undefined.com',
      })
      @IsEmail()
      @IsNotEmpty()
      email: string;
    

    @ApiProperty({
        name: 'lastname',
        description: 'Lastname',
        example: 'Jacques',
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        name: 'phone',
        description: 'Phone',
        example: '+33612345678',
        pattern: '/^(+d{11})$/',
    })
    @IsPhoneNumber('FR')
    phone: string;

  }