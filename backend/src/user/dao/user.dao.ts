import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { filter, from, map, mergeMap, Observable } from 'rxjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from '../schemas/user.schema';
import { UpdateUserDto } from '../dto/update-user.dto';


@Injectable()
export class UserDao {
  

  /**
 * Class constructor
 *
 * @param {Model<User>} _userModel instance of the model representing a user
 */
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<User>,
  ) { }

  /**
   * Call mongoose method, call toJSON on each result and returns UserModel[]
   *
   * @return {Observable<User[]>}
   */
  find = (): Observable<User[]> =>
    from(this._userModel.find({})).pipe(
      map((people: any) => people.map((p) => p.toJSON())),
      map((people) => [].concat(people)));


  /**
  * Returns one user of the list matching id in parameter
  *
  * @param {string} id of the user in the db
  *
  * @return {Observable<User | void>}
  */
  findById = (id: string): Observable<User | void> =>
    from(this._userModel.findById(id));

  /**
 * Returns one user from the list matching the provided email
 *
 * @param {string} email The email of the user to search for
 *
 * @return {Observable<User | void>}
 */
  findByEmail = (email: string): Observable<User | void> =>
    from(this._userModel.findOne({ email }));


  /**
     * Save a new user to the database
     *
     * @param {CreateUserDto} user to create
     *
     * @return {Observable<User>}
     */
  save = (user: CreateUserDto): Observable<User> =>
    from(new this._userModel(user).save());


  /**
     * Update a user in the list of users
     *
     * @param {string} id of the user in the database
     * @param {UpdateuserDto} user to update
     *
     * @return {Observable<user | void>}
     */
  findByIdAndUpdate = (
    id: string,
    user: UpdateUserDto,
  ): Observable<User | void> =>
    from(
      this._userModel.findByIdAndUpdate(id, user, {
        new: true,
        runValidators: true,
      }),
    );

  /**
   * Delete a user from the list of users
   *
   * @param {string} id of the user in the database
   *
   * @return {Observable<User | void>}
   */
  findByIdAndRemove = (id: string): Observable<User | void> =>
    from(this._userModel.findByIdAndRemove(id));
}

