import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../shared/services/question.service';
import { Question } from '../../shared/types/question.type';
import { Survey } from 'src/app/shared/types/survey.type';
import { SurveyService } from 'src/app/shared/services/survey.service';


@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: []
})
export class MainSectionComponent implements OnInit {

  private _questions: Question[];
  private _surveys: Survey[];
  private _questionsSelected: Question[];
  private _showPopup = false;
  private _showEditPopup = false;
  private _showPopupSurvey = false;
  private _activeTab = 'question';
  surveySelected: Survey;
  searchQuery: string;
  searchDate: Date | undefined;
  searchOwner: boolean;

  constructor(
    private _questionService: QuestionService,
    private _surveyService: SurveyService
  ) {
    this._questions = [] as Question[];
    this._surveys = [] as Survey[];
    this._questionsSelected = [] as Question[];
    this.surveySelected = {} as Survey;
    this._showPopup = false;
    this._showEditPopup = false;
    this._showPopupSurvey = false;
    this._activeTab = 'question';
    this.searchQuery = '';
    this.searchDate = undefined;
    this.searchOwner = false;
  }

  ngOnInit(): void {
    this._questionService.getQuestions().subscribe(questions => {
      this._questions = questions;
    });
    this._surveyService.getSurveys().subscribe(surveys => {
      this._surveys = surveys;
    });
  }

  get questions(): Question[] {
    return this._questions;
  }

  get surveys(): Survey[] {
    return this._surveys;
  }

  get questionsSelected(): Question[] {
    return this._questionsSelected;
  }

  get showPopup(): boolean {
    return this._showPopup;
  }

  get showPopupSurvey(): boolean {
    return this._showPopupSurvey;
  }

  get showEditPopup(): boolean {
    return this._showEditPopup;
  }

  get activeTab(): string {
    return this._activeTab;
  }

  openPopup(): void {
    this._showPopup = true;
  }

  closePopup(): void {
    this._showPopup = false;
  }

  openEditPopup(): void {
    this._showEditPopup = true;
  }

  closeEditPopup(): void {
    this._questionService.getQuestions().subscribe(questions => {
      this._questions = questions;
    });
    this._questionsSelected = [] as Question[];
    this._showEditPopup = false;
  }

  openPopupSurvey(): void {
    this._showPopupSurvey = true;
  }

  closePopupSurvey(): void {
    this._showPopupSurvey = false;
  }

  changeActiveTab(): void {
    this._activeTab = this._activeTab === 'question' ? 'sondage' : 'question';
  }

}

