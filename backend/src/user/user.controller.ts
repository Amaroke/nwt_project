import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors, Post, Put, Delete, Body } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnprocessableEntityResponse, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { Observable } from 'rxjs';
import { HandlerParams } from './validators/handler-params';
import { HttpInterceptor } from 'src/interceptors/http.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login-user.dto';

@ApiTags('users')
@Controller('users')
@UseInterceptors(HttpInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

  /**
 * Class constructor
 * @param _userService
 */
  constructor(private readonly _userService: UserService) { }


  /**
   * Handler to answer to GET /user route
   *
   * @returns Observable<UserEntity[] | void>
   */
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiOkResponse({
    status: 200,
    description: 'Retourne la liste des utilisateurs',
    type: UserEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'Aucun utilisateur dans la BDD' })
  @Get()
  findAll(): Observable<UserEntity[] | void> {
    return this._userService.findAll();
  }


  /**
   * Handler to answer to GET /user/:id route
   *
   * @param {HandlerParams} params list of route params to take user id
   *
   * @returns Observable<UserEntity>
   */
  @ApiOkResponse({
    status: 200,
    description: 'Recupère l\'utilisateur selon l\'ID',
    type: UserEntity,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'L\'utilisateur avec cette l\'ID n\'existe pas dans la BDD  ',
  })
  @ApiUnprocessableEntityResponse({
    status: 500,
    description: "La requête ne peut pas être effectuer sur la BDD",
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Le paramètre fourni n\'est pas bon'
  })
  @ApiParam({
    name: 'id',
    description: 'Identifiant unique de l\'utilisateur dans la BDD',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':id')
  findOne(@Param() params: HandlerParams): Observable<UserEntity> {
    return this._userService.findOne(params.id);
  }

  @ApiOperation({ summary: 'Créer un nouveau utilisateur' })
  @ApiBody({ type: CreateUserDto, description: 'Données de le nouveau utilisateur' })
  @ApiResponse({ status: 201, type: UserEntity, description: 'Utilisateur créée avec succès' })
  @ApiResponse({ status: 400, description: 'Mauvaise demande' })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<UserEntity> {
    return this._userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Mettre à jour un utilisateur par ID' })
  @ApiParam({ name: 'id', description: 'ID de l\'utilisateur' })
  @ApiBody({ type: UpdateUserDto, description: "Données de l\'utilisateur mise à jour" })
  @ApiResponse({ status: 200, type: UserEntity, description: "Utilisateur mise à jour avec succès" })
  @ApiResponse({ status: 400, description: "Mauvaise demande" })
  @ApiResponse({ status: 404, description: "Utilisateur non trouvée" })
  @Put(':id')
  update(@Param() params: HandlerParams, @Body() updateUserDto: UpdateUserDto): Observable<UserEntity> {
    return this._userService.update(params.id, updateUserDto);
  }

  @ApiOperation({ summary: 'Supprimer un utilisateur par ID' })
  @ApiParam({ name: 'id', description: 'ID de l\'utilisateur' })
  @ApiResponse({ status: 204, description: 'Utilisateur supprimée avec succès' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvée' })
  @Delete(':id')
  remove(@Param() params: HandlerParams): Observable<void> {
    return this._userService.delete(params.id);
  }


  /**
    * Handler to answer to POST /login route with email and password in the request body
    *
    * @param {LoginDto} loginData The data containing email and password
    *
    * @returns Observable<UserEntity>
    */
  @ApiOkResponse({
    status: 200,
    description: 'Connecte l\'utilisateur avec succès',
    type: UserEntity,
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: 'La requête ne peut pas être effectuée sur la BDD',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Les données fournies ne sont pas valides',
  })
  @Post('/login')
  login(@Body() loginData: LoginDto): Observable<String> {
    return this._userService.login(loginData.email, loginData.password);
  }
}
