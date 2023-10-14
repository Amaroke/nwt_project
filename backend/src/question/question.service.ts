import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, map, filter, defaultIfEmpty } from 'rxjs/operators';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionEntity } from './entities/question.entity';
import { QuestionDao } from './dao/question.dao';

@Injectable()
export class QuestionService {
    constructor(private readonly _questionsDao: QuestionDao) { }

    findAll = (): Observable<QuestionEntity[] | void> =>
        this._questionsDao.find().pipe(
            filter(Boolean),
            map((people) => (people || []).map((person) => new QuestionEntity(person))),
            defaultIfEmpty(undefined),
        );


    findOne = (id: string): Observable<QuestionEntity> =>
        this._questionsDao.findById(id).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((question) =>
                !!question
                    ? of(new QuestionEntity(question))
                    : throwError(
                        () => new NotFoundException(`Question with id '${id}' not found`),
                    ),
            ),
        );

    create = (question: CreateQuestionDto): Observable<QuestionEntity> =>
        this._questionsDao.save(question).pipe(
            catchError((e) =>
                e.code === 11000
                    ? throwError(
                        () =>
                            new ConflictException(
                                'A question with a similar title and content already exists',
                            ),
                    )
                    : throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((questionCreated) => of(new QuestionEntity(questionCreated))),
        );

    update = (id: string, question: UpdateQuestionDto): Observable<QuestionEntity> =>
        this._questionsDao.findByIdAndUpdate(id, question).pipe(
            catchError((e) =>
                e.code === 11000
                    ? throwError(
                        () =>
                            new ConflictException(
                                'A question with a similar title and content already exists',
                            ),
                    )
                    : throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((questionUpdated) =>
                !!questionUpdated
                    ? of(new QuestionEntity(questionUpdated))
                    : throwError(
                        () => new NotFoundException(`Question with id '${id}' not found`),
                    ),
            ),
        );

    delete = (id: string): Observable<void> =>
        this._questionsDao.findByIdAndRemove(id).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((questionDeleted) =>
                !!questionDeleted
                    ? of(undefined)
                    : throwError(
                        () => new NotFoundException(`Question with id '${id}' not found`),
                    ),
            ),
        );
}
