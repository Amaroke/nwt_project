import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {

  loginForm: FormGroup;
  registerError: Boolean = false;
  constructor(private _router: Router, private readonly _userService: UserService) {
    this.loginForm = new FormGroup({
      firstname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      lastname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
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
    ).subscribe({
      next: (response: any) => {
        localStorage.setItem('userId', response.id);
        localStorage.setItem('userFirstName', response.firstname);
        this._router.navigate(['/home']);
      },
      error: (_: any) => {
        this.registerError = true;
      }
    });

  }

}
