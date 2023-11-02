import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSurveyDto {
    @ApiProperty({
        name: 'title',
        description: "Title of the survey",
        example: "What is your favorite programming language?"
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        name: 'description',
        description: "Description of the survey",
        example: "I'm curious about your preferences in programming languages. Please share your favorite."
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        name: 'owner',
        description: "ID of the survey owner",
        example: "0123456789"
    })
    @IsString()
    @IsNotEmpty()
    owner: string;
}
