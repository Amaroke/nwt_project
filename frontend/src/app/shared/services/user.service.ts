import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types/user.type';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private readonly _apiUrl: any;

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

  loginUser(email: string, password: string): Observable<String> {
    return this._http.get<User>(`${this._apiUrl}/login`, email);
  }
}
