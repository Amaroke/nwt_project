import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Survey } from 'src/app/shared/types/survey.type';
import { SurveyService } from 'src/app/shared/services/survey.service';

@Component({
  selector: 'app-survey-crud-section',
  templateUrl: './survey-crud-section.component.html',
  styleUrls: []
})
export class SurveyCrudSectionComponent {

  @Input() surveySelected: Survey;
  @Input() surveys: Survey[];
  @Output() open = new EventEmitter<void>();
  @Output() openEdit = new EventEmitter<void>();

  constructor(private _surveyService: SurveyService) {
    this.surveySelected = {} as Survey;
    this.surveys = [];
  }

  isOneSurveySelected(): boolean {
    return this.surveySelected.id !== undefined;
  }

  openPopup(): void {
    this.open.emit();
  }

  openEditPopup(): void {
    this.openEdit.emit();
  }

  userIsConnected(): boolean {
    return localStorage.getItem('userId') ? true : false;
  }

  isSurveySelected(): boolean {
    return this.surveySelected.id !== undefined;
  }

  isDeletable(): boolean {
    return this.surveySelected.id !== undefined && localStorage.getItem('userId') === this.surveySelected.owner;
  }

  deleteSurvey(): void {
    if (this.surveySelected.id) {
      this._surveyService.deleteSurvey(this.surveySelected.id).subscribe(() => {
        this.surveys.splice(this.surveys.indexOf(this.surveySelected), 1);
        this.surveySelected = {} as Survey;
      });
    }
  }

  exportSurvey(): void {
    if (this.surveySelected.id) {
      console.log('Survey exported');
    }
  }
}
