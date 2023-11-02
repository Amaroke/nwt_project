import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';
import { CreateSurveyDto } from '../dto/create-survey.dto';
import { UpdateSurveyDto } from '../dto/update-survey.dto';
import { Survey } from '../schemas/survey.schema';

@Injectable()
export class SurveyDao {
    /**
     * Constructeur de la classe
     *
     * @param {Model<Survey>} _surveyModel instance du modèle représentant un sondage
     */
    constructor(
        @InjectModel(Survey.name)
        private readonly _surveyModel: Model<Survey>,
    ) { }

    /**
     * Récupère tous les sondages depuis la base de données
     *
     * @return {Observable<Survey[]>} Une liste de sondages
     */
    findAllSurveys = (): Observable<Survey[]> =>
        from(this._surveyModel.find({})).pipe(map((surveys) => [].concat(surveys)));

    /**
     * Récupère un sondage correspondant à l'ID fourni
     *
     * @param {string} id de sondage dans la base de données
     *
     * @return {Observable<Survey | void>} Le sondage correspondant ou undefined
     */
    findSurveyById = (id: string): Observable<Survey | void> =>
        from(this._surveyModel.findById(id));

    /**
     * Enregistre un nouveau sondage dans la base de données
     *
     * @param {CreateSurveyDto} survey à créer
     *
     * @return {Observable<Survey>} Le sondage créé
     */
    createSurvey = (survey: CreateSurveyDto): Observable<Survey> =>
        from(new this._surveyModel(survey).save());

    /**
     * Met à jour un sondage dans la liste de sondages
     *
     * @param {string} id du sondage dans la base de données
     * @param {UpdateSurveyDto} survey à mettre à jour
     *
     * @return {Observable<Survey | void>} Le sondage mis à jour ou undefined
     */
    findByIdAndUpdate = (id: string, survey: UpdateSurveyDto): Observable<Survey | void> =>
        from(
            this._surveyModel.findByIdAndUpdate(id, survey, {
                new: true,
                runValidators: true,
            })
        );

    /**
     * Supprime un sondage de la liste de sondages
     *
     * @param {string} id du sondage dans la base de données
     *
     * @return {Observable<Survey | void>} Le sondage supprimé ou undefined
     */
    deleteSurveyById = (id: string): Observable<Survey | void> =>
        from(this._surveyModel.findByIdAndRemove(id));
}
