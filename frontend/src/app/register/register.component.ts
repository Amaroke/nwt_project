import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from '../shared/types/user.type';
import { UserService } from '../shared/services/user.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {

  loginForm: FormGroup;
  registerError: Boolean =false;
  constructor(private authService: AuthService,private _router: Router,private readonly _userService: UserService) {
    this.loginForm = new FormGroup({
      firstname: new FormControl('',Validators.compose([Validators.required, Validators.minLength(2)])),
      lastname: new FormControl('',Validators.compose([Validators.required, Validators.minLength(2)])),
      email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
      password: new FormControl('',Validators.compose([Validators.required, Validators.minLength(5)])),
      phone: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('(0|\\+33)\\d{9}'),
        ])
      ),
    });
  } 

  
  submit(form: FormGroup): void {
    this.registerError = false;
    this._userService.registerUser(
      form.value.firstname,
      form.value.lastname,
      form.value.email,
      form.value.password,
      form.value.phone
      )
    .subscribe(
          (response:any) => {
            const userId = response.id;
            this.authService.login(userId,form.value.firstname);
            this._router.navigate(['/home/'+userId]),
          console.log('Réponse du backend :', response);
        },
        (error: any) => {
          this.registerError = true;
        }
      );
  }

}
