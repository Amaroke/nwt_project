import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types/user.type';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private readonly _apiUrl: string;

  constructor(private _http: HttpClient) {
    this._apiUrl = `${environment.apiUrl}`;
  }

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${this._apiUrl}/users`);
  }

  getUser(id: number): Observable<User> {
    return this._http.get<User>(`${this._apiUrl}/users/${id}`);
  }

  createUser(UserData: User): Observable<User> {
    return this._http.post<User>(`${this._apiUrl}/users`, UserData);
  }

  updateUser(id: number, UserData: User): Observable<User> {
    return this._http.put<User>(`${this._apiUrl}/users/${id}`, UserData);
  }

  deleteUser(id: number): Observable<void> {
    return this._http.delete<void>(`${this._apiUrl}/users/${id}`);
  }

  loginUser(email: string, password: string): Observable<string> {
    const loginData = { email, password };
    return this._http.put<string>(`${this._apiUrl}/users/login`, loginData);
  }

  registerUser(firstname: string,lastname: string,email: string,password: string, phone: string): Observable<string> {
    const loginData = { firstname,lastname,email, password,phone };
    return this._http.post<string>(`${this._apiUrl}/users/register`, loginData);
  }

  getUserFirstName(id:string): Observable<string> {
    return this._http.get<string>(`${this._apiUrl}/users/firstname/${id}`);
  }
}
