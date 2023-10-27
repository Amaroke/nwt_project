import { IsNotEmpty, IsString, IsInt, IsDate, IsArray, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
    @ApiProperty({
        name: 'title',
        description: 'Title of the question',
        example: 'What is your favorite programming language?',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        name: 'content',
        description: 'Content of the question',
        example: 'I\'m curious about your preferences in programming languages. Please share your favorite.',
    })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({
        name: 'answers',
        description: 'Answers of the question',
        example: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'PHP', 'C/C++', 'Ruby', 'Go', 'Other'],
    })
    @IsArray()
    @IsNotEmpty()
    answers: Array<string>;

    @ApiProperty({
        name: 'type',
        description: 'Type of the question (e.g., 1, 2, 3, 4, etc.)',
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    type: number;

    @ApiProperty({
        name: 'owner',
        description: 'ID of the question owner',
        example: '0123456789',
    })
    @IsString()
    @IsNotEmpty()
    owner: string;
}
