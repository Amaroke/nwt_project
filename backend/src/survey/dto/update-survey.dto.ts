import { IsNotEmpty, IsString, IsOptional, IsArray, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSurveyDto {
    @ApiPropertyOptional({
        name: 'title',
        description: 'Updated title of the survey',
        example: "Updated survey title",
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    title?: string;

    @ApiPropertyOptional({
        name: 'description',
        description: 'Updated description of the survey',
        example: "Updated survey description",
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description?: string;
}
