import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Question } from '../schemas/question.schema';

@Exclude()
export class QuestionEntity {
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
        description: 'Title of the question',
        example: 'What is your favorite programming language?',
    })
    @Expose()
    @Type(() => String)
    title: string;

    @ApiProperty({
        name: 'content',
        description: 'Content of the question',
        example: 'I\'m curious about your preferences in programming languages. Please share your favorite.',
    })
    @Expose()
    @Type(() => String)
    content: string;

    @ApiProperty({
        name: 'answers',
        description: 'Answers of the question',
        example: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'PHP', 'C/C++', 'Ruby', 'Go', 'Other'],
    })
    @Expose()
    @Type(() => Array<String>)
    answers: Array<string>;

    @ApiProperty({
        name: 'type',
        description: 'Type of the question (e.g., 1, 2, 3, 4, etc.)',
        example: 1,
    })
    @Expose()
    @Type(() => Number)
    type: number;

    @ApiProperty({
        name: 'owner',
        description: 'ID of the question owner',
        example: '653aa2bcca9e0505649b2dd2',
    })
    @Expose()
    @Type(() => String)
    owner: string;

    @ApiProperty({
        name: 'date',
        description: 'Date when the question was created',
        example: '2023-10-14T12:00:00Z',
    })
    @Expose()
    @Type(() => Date)
    date: Date;

    /**
     * Class constructor
     *
     * @param partial data to insert in object instance
     */
    constructor(partial: Partial<Question>) {
        this.id = partial._id?.toString();
        this.title = partial.title;
        this.content = partial.content;
        this.answers = partial.answers;
        this.type = partial.type;
        this.owner = partial.owner;
        this.date = partial.date;
    }
}
