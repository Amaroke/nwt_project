import { Component,EventEmitter,Output,Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/types/user.type';
import { UserService } from '../shared/services/user.service';
import { HttpClient, HttpHandler } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  private readonly _form: FormGroup;
  private readonly _submit$: EventEmitter<User>;
  private _model: User;

  constructor(private readonly _userService: UserService) {
    this._form = this._buildForm();
    this._submit$ = new EventEmitter<User>();
    this._model = {} as User;

  }
   get form():FormGroup{
    return this._form;
   }

   @Input()
  set model(model: User) {
    this._model = model;
  }
  get model(): User {
    return this._model;
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(),
      firstname: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      lastname: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      _email: new FormControl(
        '',
        Validators.compose([Validators.required,Validators.minLength(10)])
      ),
      get email() {
        return this._email;
      },
      set email(value) {
        this._email = value;
      },
      phone: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('(0|\\+33)\\d{9}'),
        ])
      ),
    });
  }

  submit(user: User): void {
    console.log("Le user = "+ user);
    this._userService.createUser(user);
  }
  
  @Output('submit')
  get submit$(): EventEmitter<User> {
    return this._submit$;
  }
}
