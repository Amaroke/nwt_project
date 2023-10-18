import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../types/question.type';
import { config } from 'dotenv';

config();

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = process.env['API_URL'];

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/questions`);
  }

  getQuestion(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/questions/${id}`);
  }

  createQuestion(questionData: Question): Observable<Question> {
    return this.http.post<Question>(`${this.apiUrl}/questions`, questionData);
  }

  updateQuestion(id: number, questionData: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/questions/${id}`, questionData);
  }

  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/questions/${id}`);
  }
}
