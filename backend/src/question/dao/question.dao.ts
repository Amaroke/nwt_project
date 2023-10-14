import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { Question } from '../schemas/question.schema';

@Injectable()
export class QuestionDao {
    /**
     * Class constructor
     *
     * @param {Model<Question>} _questionModel instance of the model representing a Question
     */
    constructor(
        @InjectModel(Question.name)
        private readonly _questionModel: Model<Question>,
    ) { }

    /**
     * Call mongoose method, call toJSON on each result and returns QuestionModel[]
     *
     * @return {Observable<Question[]>}
     */
    find = (): Observable<Question[]> =>
        from(this._questionModel.find({})).pipe(map((questions) => [].concat(questions)));

    /**
     * Returns one question from the list matching the provided id
     *
     * @param {string} id of the question in the database
     *
     * @return {Observable<Question | void>}
     */
    findById = (id: string): Observable<Question | void> =>
        from(this._questionModel.findById(id));

    /**
     * Save a new question to the database
     *
     * @param {CreateQuestionDto} question to create
     *
     * @return {Observable<Question>}
     */
    save = (question: CreateQuestionDto): Observable<Question> =>
        from(new this._questionModel(question).save());

    /**
     * Update a question in the list of questions
     *
     * @param {string} id of the question in the database
     * @param {UpdateQuestionDto} question to update
     *
     * @return {Observable<Question | void>}
     */
    findByIdAndUpdate = (
        id: string,
        question: UpdateQuestionDto,
    ): Observable<Question | void> =>
        from(
            this._questionModel.findByIdAndUpdate(id, question, {
                new: true,
                runValidators: true,
            }),
        );

    /**
     * Delete a question from the list of questions
     *
     * @param {string} id of the question in the database
     *
     * @return {Observable<Question | void>}
     */
    findByIdAndRemove = (id: string): Observable<Question | void> =>
        from(this._questionModel.findByIdAndRemove(id));
}
