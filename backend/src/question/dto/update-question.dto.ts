import { IsNotEmpty, IsString, IsOptional, IsArray, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateQuestionDto {
    @ApiPropertyOptional({
        name: 'title',
        description: 'Title of the question',
        example: "Updated question title",
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    title?: string;

    @ApiPropertyOptional({
        name: 'content',
        description: 'Content of the question',
        example: "Updated question content",
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    content?: string;

    @ApiPropertyOptional({
        name: 'type',
        description: 'Type of the question',
        example: 0,
    })
    @IsOptional()
    @IsInt()
    @IsNotEmpty()
    type?: number;

    @ApiProperty({
        name: 'answers',
        description: 'Answers of the question',
        example: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'PHP', 'C/C++', 'Ruby', 'Go', 'Other'],
    })
    @IsArray()
    @IsNotEmpty()
    answers: Array<string>;

}
