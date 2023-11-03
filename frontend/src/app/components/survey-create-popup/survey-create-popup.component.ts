import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Survey } from '../../shared/types/survey.type';
import { SurveyService } from '../../shared/services/survey.service';
import { Question } from 'src/app/shared/types/question.type';

@Component({
  selector: 'app-survey-create-popup',
  templateUrl: './survey-create-popup.component.html',
  styleUrls: []
})
export class SurveyCreatePopupComponent {

  survey: Survey;
  @Input() questions: Question[];
  @Output() close = new EventEmitter<void>();

  constructor(private _surveyService: SurveyService) {
    this.questions = [];
    this.survey = {
      title: '',
      description: '',
      questions: [],
      owner: localStorage.getItem('userId')?.toString() || '',
      date: new Date()
    };
  }

  saveQuestion() {
    const questionIds = this.questions.map(question => question.id).filter(id => id !== undefined) as string[];;
    this.survey.questions = questionIds;
    this._surveyService.createSurvey(this.survey).subscribe(() => {
      this.closePopup();
      window.location.reload();
    });
  }

  closePopup(): void {
    this.close.emit();
  }
}
