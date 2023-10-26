import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  isConnected: boolean = false;
  id: string = "";
  userFn: string = "";

  login(idUser: string,userFirstname:string) {
    this.isConnected = true;
    this.id = idUser;
    this.userFn = userFirstname;
  }

  logout() {
    this.isConnected = false;
    this.id= "";
    this.userFn= "";
  }
}