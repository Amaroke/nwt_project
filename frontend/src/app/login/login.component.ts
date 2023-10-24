import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('loginForm', { static: false }) loginForm!: NgForm;

  constructor(private readonly _userService: UserService){}

  onSubmit(form: NgForm) {
    console.log(form.value);
    const idUser = this._userService.getUserByEmail(form.value.email)
    console.log(idUser);
  }
}