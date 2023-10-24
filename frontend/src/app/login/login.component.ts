import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { catchError, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  @ViewChild('loginForm', { static: false }) loginForm!: NgForm;

  constructor(private readonly _userService: UserService) { }

  onSubmit(form: NgForm) {
    console.log(form.value.email, form.value.password);

    this._userService.loginUser(form.value.email, form.value.password)
      .subscribe(
        (response: string) => {
          console.log('Réponse du backend :', response);
        }
      );
  }
}