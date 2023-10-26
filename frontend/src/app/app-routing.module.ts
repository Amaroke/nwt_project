import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainSectionComponent } from './main-section/main-section.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainSectionComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [canActivateLoginRegister]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [canActivateLoginRegister]
  },
];

export function canActivateLoginRegister() {
  return !localStorage.getItem('userId');
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
