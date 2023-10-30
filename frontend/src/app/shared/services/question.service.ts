import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../types/question.type';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private readonly _apiUrl: any;

  constructor(private _http: HttpClient) {
    this._apiUrl = `${environment.apiUrl}`;
  }

  getQuestions(): Observable<Question[]> {
    return this._http.get<Question[]>(`${this._apiUrl}/questions`);
  }

  getQuestion(id: number): Observable<Question> {
    return this._http.get<Question>(`${this._apiUrl}/questions/${id}`);
  }

  createQuestion(questionData: Question): Observable<Question> {
    return this._http.post<Question>(`${this._apiUrl}/questions`, questionData);
  }

  updateQuestion(id: number, questionData: Question): Observable<Question> {
    return this._http.put<Question>(`${this._apiUrl}/questions/${id}`, questionData);
  }

  deleteQuestion(id: string): Observable<void> {
    return this._http.delete<void>(`${this._apiUrl}/questions/${id}`);
  }
}
