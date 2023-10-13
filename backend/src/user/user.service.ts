import { Observable, of, throwError } from "rxjs";
import { User } from "./schemas/user.schema";
import {
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

}