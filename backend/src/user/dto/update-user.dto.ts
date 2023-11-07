import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiPropertyOptional({
        name: 'email',
        description: 'email of the user',
        example: "Updated user email",
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    email?: string;

}