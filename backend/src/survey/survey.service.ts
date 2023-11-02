import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, map, filter, defaultIfEmpty } from 'rxjs/operators';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { SurveyEntity } from './entities/survey.entity';
import { SurveyDao } from './dao/survey.dao';

@Injectable()
export class SurveyService {
    constructor(private readonly _surveyDao: SurveyDao) { }

    findAll = (): Observable<SurveyEntity[] | void> =>
        this._surveyDao.findAllSurveys().pipe(
            filter(Boolean),
            map((surveys) => (surveys || []).map((survey) => new SurveyEntity(survey))),
            defaultIfEmpty(undefined),
        );

    findOne = (id: string): Observable<SurveyEntity> =>
        this._surveyDao.findSurveyById(id).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((survey) =>
                !!survey
                    ? of(new SurveyEntity(survey))
                    : throwError(
                        () => new NotFoundException(`Survey with id '${id}' not found`),
                    ),
            ),
        );

    create = (survey: CreateSurveyDto): Observable<SurveyEntity> =>
        this._surveyDao.createSurvey(survey).pipe(
            mergeMap((surveyCreated) => of(new SurveyEntity(surveyCreated))),
        );

    update = (id: string, survey: UpdateSurveyDto): Observable<SurveyEntity> =>
        this._surveyDao.findByIdAndUpdate(id, survey).pipe(
            mergeMap((surveyUpdated) =>
                !!surveyUpdated
                    ? of(new SurveyEntity(surveyUpdated))
                    : throwError(
                        () => new NotFoundException(`Survey with id '${id}' not found`),
                    ),
            ),
        );

    delete = (id: string): Observable<void> =>
        this._surveyDao.deleteSurveyById(id).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((surveyDeleted) =>
                !!surveyDeleted
                    ? of(undefined)
                    : throwError(
                        () => new NotFoundException(`Survey with id '${id}' not found`),
                    ),
            ),
        );
}
