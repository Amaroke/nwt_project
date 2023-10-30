import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { __values } from 'tslib';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {

  loginError: boolean = false;
  loginForm: FormGroup;
  constructor(private _router: Router, private readonly _userService: UserService) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit(loginForm: NgForm) {
    this.loginError = false;
    this._userService.loginUser(loginForm.value.email, loginForm.value.password)
      .subscribe(
        {
          next: (response: any) => {
            localStorage.setItem('userId', response.id);
            localStorage.setItem('userFirstName', response.firstname);
            this._router.navigate(['/home']);
          },
          error: (_: any) => {
            this.loginError = true;
          }
        }
      );
  }
}