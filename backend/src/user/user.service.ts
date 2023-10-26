import { Observable, of, throwError } from "rxjs";
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
  switchMap,
} from 'rxjs/operators';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { IdEntity } from "./entities/id.entity";

@Injectable()
export class UserService {

  /**
   * Class constructor
   *
   * @param {UserDao} _userDao instance of the DAO
   */
  constructor(private readonly _userDao: UserDao) { }

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
  create = (user: CreateUserDto): Observable<IdEntity> =>
    this._userDao.findByEmail(user.email).pipe(
      mergeMap((userCreated) => {
        if (!userCreated) {
          return this._userDao.save(user).pipe(
            map(userCreated => new IdEntity(userCreated._id)),
          );
        }
        return throwError(() => new NotFoundException(`User with email '${user.email}' already exists`));
      }));


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

  /**
   * Authenticate the user with the provided email and password
   * @param email The email of the user
   * @param password The user's password
   * @returns {Observable<string>}
   */
  login = (email: string, password: string): Observable<IdEntity> =>
    this._userDao.findByEmail(email).pipe(
      mergeMap((user) => {
        if (!user) {
          return throwError(() => new NotFoundException(`User with email '${email}' not found`));
        }

        if (user.password !== password) {
          return throwError(() => new UnprocessableEntityException('Invalid password'));
        }

        return of(new IdEntity(user));
      }),
    );
}