import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from '../schemas/user.schema';


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
  ) {}

  /**
   * Call mongoose method, call toJSON on each result and returns UserModel[]
   *
   * @return {Observable<User[]>}
   */
  find = (): Observable<User[]> =>
    from(this._userModel.find({})).pipe(
      map((people: any) => people.map((p)=>p.toJSON())),
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

  save = (user: CreateUserDto): Observable<User> =>
  from(new this._userModel(user).save());
 
}