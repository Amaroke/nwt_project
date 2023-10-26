import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { Observable, catchError, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../shared/types/user.type';
import { AuthService } from '../shared/services/auth.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
 
  loginError: boolean = false;
  loginForm: FormGroup;
  constructor(private authService: AuthService,private _router: Router,private readonly _userService: UserService) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
   }

  onSubmit(loginForm: NgForm) {
    this.loginError = false;
    this._userService.loginUser(loginForm.value.email, loginForm.value.password)
      .subscribe(
        (response:any) => {
          const userId = response.id;
          this.authService.login(userId,loginForm.value.email)// a remplacer par le Firstname
          this._router.navigate(['/home/'+userId]),
          console.log('Réponse du backend :', response);
        },
        (error: any) => {
          this.loginError = true; // Définissez la variable d'erreur en cas d'erreur de connexion
        }
      );
  }
}