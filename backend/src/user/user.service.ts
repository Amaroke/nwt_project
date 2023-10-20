import { Observable, of, throwError } from "rxjs";
import { User } from "./schemas/user.schema";
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { UserEntity } from "./entities/user.entity";
import { UserDao } from "./dao/user.dao";
import {
  catchError,
  defaultIfEmpty,
  filter,
  map,
  mergeMap,
} from 'rxjs/operators';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  // private property to store all user

  /**
   * Class constructor
   *
   * @param {UserDao} _userDao instance of the DAO
   */
  constructor(private readonly _userDao: UserDao) {
  }


  /**
   * Returns all existing user in the list
   *
   * @returns {Observable<UserEntity[] | void>}
   */
  findAll = (): Observable<UserEntity[] | void> =>
    this._userDao.find().pipe(
      filter(Boolean),
      map((user) => (user || []).map((user) => new UserEntity(user))),
      defaultIfEmpty(undefined),
    );


  /**
 * Returns one user of the list matching id in parameter
 *
 * @param {string} id of the user
 *
 * @returns {Observable<UserEntity>}
 */
  findOne = (id: string): Observable<UserEntity> =>
    this._userDao.findById(id).pipe(
      mergeMap((user) => {
        if (!!user) {
          return of(new UserEntity(user));
        } else {
          return throwError(
            () => new NotFoundException(`User with id '${id}' not found`)
          );
        }
      }),
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message))
      )
    );

  /**
   * Create a new user
   * @param user
   * @returns {Observable<UserEntity>}
   */    
  create = (user: CreateUserDto): Observable<UserEntity> =>
      this._userDao.save(user).pipe(
          catchError((e) =>
              e.code === 11000
                  ? throwError(
                      () =>
                          new ConflictException(
                              'A user with a similar email and content already exists',
                          ),
                  )
                  : throwError(() => new UnprocessableEntityException(e.message)),
          ),
          mergeMap((userCreated) => of(new UserEntity(userCreated))),
      );

  /**
   * Updates a user's information with id 
   * @param id of the user
   * @param user 
   * @returns {Observable<UserEntity>}
   */
  update = (id: string, user: UpdateUserDto): Observable<UserEntity> =>
    this._userDao.findByIdAndUpdate(id, user).pipe(
        catchError((e) =>
            e.code === 11000
                ? throwError(
                    () =>
                        new ConflictException(
                            'A user with a similar email already exists',
                        ),
                )
                : throwError(() => new UnprocessableEntityException(e.message)),
        ),
        mergeMap((userUpdated) =>
            !!userUpdated
                ? of(new UserEntity(userUpdated))
                : throwError(
                    () => new NotFoundException(`User with id '${id}' not found`),
                ),
        ),
    );

  /**
   * Delete the user from the database
   * @param id of the user
   * @returns {Observable<void>}
   */
  delete = (id: string): Observable<void> =>
  this._userDao.findByIdAndRemove(id).pipe(
      catchError((e) =>
          throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((userDeleted) =>
          !!userDeleted
              ? of(undefined)
              : throwError(
                  () => new NotFoundException(`User with id '${id}' not found`),
              ),
      ),
  );

}