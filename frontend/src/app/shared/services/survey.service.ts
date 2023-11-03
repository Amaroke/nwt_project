import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../types/survey.type';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SurveyService {
    private readonly apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    getSurveys(): Observable<Survey[]> {
        return this.http.get<Survey[]>(`${this.apiUrl}/surveys`);
    }

    getSurvey(id: number): Observable<Survey> {
        return this.http.get<Survey>(`${this.apiUrl}/surveys/${id}`);
    }

    createSurvey(surveyData: Survey): Observable<Survey> {
        delete surveyData.id;
        surveyData.date = new Date();
        return this.http.post<Survey>(`${this.apiUrl}/surveys`, surveyData);
    }

    updateSurvey(id: string, surveyData: Survey): Observable<Survey> {
        delete surveyData.id;
        delete surveyData.owner;
        delete surveyData.date;
        return this.http.put<Survey>(`${this.apiUrl}/surveys/${id}`, surveyData);
    }

    deleteSurvey(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/surveys/${id}`);
    }

    downloadSurvey(id: string): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/surveys/${id}/download`, {});
    }
}
