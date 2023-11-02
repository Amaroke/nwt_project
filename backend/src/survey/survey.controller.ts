import { Body, Controller, Get, Param, Post, Put, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { SurveyEntity } from './entities/survey.entity';
import { SurveyService } from './survey.service';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { Observable } from 'rxjs';
import { HandlerParams } from './validators/handler-params';

@ApiTags('surveys')
@Controller('surveys')
@UseInterceptors(HttpInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
export class SurveyController {
    constructor(private readonly surveyService: SurveyService) { }

    @ApiOperation({ summary: 'Récupérer tous les sondages' })
    @ApiResponse({ status: 200, type: [SurveyEntity], description: 'Liste de sondages' })
    @Get()
    findAll(): Observable<SurveyEntity[] | void> {
        return this.surveyService.findAll();
    }

    @ApiOperation({ summary: 'Récupérer un sondage par ID' })
    @ApiParam({ name: 'id', description: 'ID du sondage' })
    @ApiResponse({ status: 200, type: SurveyEntity, description: 'Sondage trouvé' })
    @ApiResponse({ status: 404, description: 'Sondage non trouvé' })
    @Get(':id')
    findOne(@Param() params: HandlerParams): Observable<SurveyEntity> {
        return this.surveyService.findOne(params.id);
    }

    @ApiOperation({ summary: 'Créer un nouveau sondage' })
    @ApiBody({ type: CreateSurveyDto, description: 'Données du nouveau sondage' })
    @ApiResponse({ status: 201, type: SurveyEntity, description: 'Sondage créé avec succès' })
    @ApiResponse({ status: 400, description: 'Mauvaise demande' })
    @Post()
    create(@Body() createSurveyDto: CreateSurveyDto): Observable<SurveyEntity> {
        return this.surveyService.create(createSurveyDto);
    }

    @ApiOperation({ summary: 'Mettre à jour un sondage par ID' })
    @ApiParam({ name: 'id', description: 'ID du sondage' })
    @ApiBody({ type: UpdateSurveyDto, description: "Données du sondage mis à jour" })
    @ApiResponse({ status: 200, type: SurveyEntity, description: "Sondage mis à jour avec succès" })
    @ApiResponse({ status: 400, description: "Mauvaise demande" })
    @ApiResponse({ status: 404, description: "Sondage non trouvé" })
    @Put(':id')
    update(@Param() params: HandlerParams, @Body() updateSurveyDto: UpdateSurveyDto): Observable<SurveyEntity> {
        return this.surveyService.update(params.id, updateSurveyDto);
    }

    @ApiOperation({ summary: 'Supprimer un sondage par ID' })
    @ApiParam({ name: 'id', description: 'ID du sondage' })
    @ApiResponse({ status: 204, description: 'Sondage supprimé avec succès' })
    @ApiResponse({ status: 404, description: 'Sondage non trouvé' })
    @Delete(':id')
    remove(@Param() params: HandlerParams): Observable<void> {
        return this.surveyService.delete(params.id);
    }
}
