import { IsEmail, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({
        name: 'email',
        description: 'Email',
        example: 'louis.jacques@undefined.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        name: 'password',
        description: 'Password',
        example: 'Jacques54',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
