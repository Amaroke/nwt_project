import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Survey } from 'src/app/shared/types/survey.type';

@Component({
  selector: 'app-surveys-list',
  templateUrl: './surveys-list.component.html',
  styleUrls: []
})
export class SurveysListComponent {
  @Input() surveys: Survey[];
  @Input() searchQuery: string;
  @Input() searchDate: Date | undefined;
  @Input() searchOwner: boolean;
  @Output() searchOwnerChange = new EventEmitter<boolean>();
  @Input() surveySelected: Survey;
  @Output() surveySelectedChange = new EventEmitter<Survey>();

  constructor() {
    this.surveys = [];
    this.surveySelected = {} as Survey;
    this.searchQuery = '';
    this.searchDate = undefined;
    this.searchOwner = false;
  }

  isSelected(survey: Survey): boolean {
    return this.surveySelected === survey;
  }

  toggleSelection(survey: Survey): void {

    if (this.isSelected(survey)) {
      this.surveySelected = {} as Survey;
      this.surveySelectedChange.emit({} as Survey);
    } else {
      this.surveySelected = survey;
      this.surveySelectedChange.emit(survey);
    }
  }

  getUserConnected(): string | null {
    return localStorage.getItem('userId');
  }


  isDateBefore(questionDate: Date | undefined): boolean {
    if (this.searchDate === undefined || questionDate === undefined) {
      return false;
    }
    return new Date(this.searchDate) < new Date(questionDate);
  }

  filterSurveys() {
    return this.surveys.filter((survey) => {
      return (!this.searchOwner || survey.owner === this.getUserConnected()) &&
        survey.title.includes(this.searchQuery) &&
        !this.isDateBefore(survey.date);
    }).sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
  }

}