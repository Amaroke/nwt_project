import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Survey } from '../schemas/survey.schema';

@Exclude()
export class SurveyEntity {
    @ApiProperty({
        name: 'id',
        description: 'Unique identifier in the database',
        example: '5763cd4dc378a38ecd387737',
    })
    @Expose()
    @Type(() => String)
    id: string;

    @ApiProperty({
        name: 'title',
        description: 'Title of the survey',
        example: 'What is your favorite programming language?',
    })
    @Expose()
    @Type(() => String)
    title: string;

    @ApiProperty({
        name: 'description',
        description: 'Description of the survey',
        example: 'I\'m curious about your preferences in programming languages. Please share your favorite.',
    })
    @Expose()
    @Type(() => String)
    description: string;

    @ApiProperty({
        name: 'date',
        description: 'Date when the survey was created',
        example: '2023-10-14T12:00:00Z',
    })
    @Expose()
    @Type(() => Date)
    date: Date;

    @ApiProperty({
        name: 'owner',
        description: 'ID of the survey owner',
        example: '653aa2bcca9e0505649b2dd2',
    })
    @Expose()
    @Type(() => String)
    owner: string;

    @ApiProperty({
        name: 'questions',
        description: 'Questions of the survey',
        example: ['Java', 'Python', 'C++', 'C#', 'JavaScript', 'PHP', 'Ruby', 'Go', 'Swift', 'Rust'],
    })
    @Expose()
    @Type(() => String)
    questions: string[];

    /**
     * Class constructor
     *
     * @param partial data to insert in object instance
     */
    constructor(partial: Partial<Survey>) {
        this.id = partial._id?.toString();
        this.title = partial.title;
        this.description = partial.description;
        this.date = partial.date;
        this.owner = partial.owner;
        this.questions = partial.questions;
    }
}
