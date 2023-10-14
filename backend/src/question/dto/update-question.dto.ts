import { IsNotEmpty, IsString, IsInt, IsOptional, IsDate } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

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

}
