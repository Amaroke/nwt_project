import { Controller, Get, Param } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { Observable } from 'rxjs';
import { HandlerParams } from './validators/handler-params';

@ApiTags('user')
@Controller('user')
export class UserController {

    /**
   * Class constructor
   * @param _userService
   */
  constructor(private readonly _userService: UserService) {}


  /**
   * Handler to answer to GET /user route
   *
   * @returns Observable<UserEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns an array of user',
    type: UserEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No user exists in database' })
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
    description: 'Returns the user for the given "id"',
    type: UserEntity,
  })
  @ApiNotFoundResponse({
    description: 'User with the given "id" doesn\'t exist in the database',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the user in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':id')
  findOne(@Param() params: HandlerParams): Observable<UserEntity> {
    return this._userService.findOne(params.id);
  }
}
