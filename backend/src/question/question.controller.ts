import { Body, Controller, Get, Param, Post, Put, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionEntity } from './entities/question.entity';
import { QuestionService } from './question.service';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { Observable } from 'rxjs';
import { HandlerParams } from './validators/handler-params';

@ApiTags('questions')
@Controller('questions')
@UseInterceptors(HttpInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
export class QuestionController {
    constructor(private readonly questionService: QuestionService) { }

    @ApiOperation({ summary: 'Récupérer toutes les questions' })
    @ApiResponse({ status: 200, type: [QuestionEntity], description: 'Liste de questions' })
    @Get()
    findAll(): Observable<QuestionEntity[] | void> {
        return this.questionService.findAll();
    }

    @ApiOperation({ summary: 'Récupérer une question par ID' })
    @ApiParam({ name: 'id', description: 'ID de la question' })
    @ApiResponse({ status: 200, type: QuestionEntity, description: 'Question trouvée' })
    @ApiResponse({ status: 404, description: 'Question non trouvée' })
    @Get(':id')
    findOne(@Param() params: HandlerParams): Observable<QuestionEntity> {
        return this.questionService.findOne(params.id);
    }

    @ApiOperation({ summary: 'Créer une nouvelle question' })
    @ApiBody({ type: CreateQuestionDto, description: 'Données de la nouvelle question' })
    @ApiResponse({ status: 201, type: QuestionEntity, description: 'Question créée avec succès' })
    @ApiResponse({ status: 400, description: 'Mauvaise demande' })
    @Post()
    create(@Body() createQuestionDto: CreateQuestionDto): Observable<QuestionEntity> {
        return this.questionService.create(createQuestionDto);
    }

    @ApiOperation({ summary: 'Mettre à jour une question par ID' })
    @ApiParam({ name: 'id', description: 'ID de la question' })
    @ApiBody({ type: UpdateQuestionDto, description: "Données de la question mise à jour" })
    @ApiResponse({ status: 200, type: QuestionEntity, description: "Question mise à jour avec succès" })
    @ApiResponse({ status: 400, description: "Mauvaise demande" })
    @ApiResponse({ status: 404, description: "Question non trouvée" })
    @Put(':id')
    update(@Param() params: HandlerParams, @Body() updateQuestionDto: UpdateQuestionDto): Observable<QuestionEntity> {
        return this.questionService.update(params.id, updateQuestionDto);
    }

    @ApiOperation({ summary: 'Supprimer une question par ID' })
    @ApiParam({ name: 'id', description: 'ID de la question' })
    @ApiResponse({ status: 204, description: 'Question supprimée avec succès' })
    @ApiResponse({ status: 404, description: 'Question non trouvée' })
    @Delete(':id')
    remove(@Param() params: HandlerParams): Observable<void> {
        return this.questionService.delete(params.id);
    }
}
