import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../shared/services/question.service';
import { Question } from '../../shared/types/question.type';


@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: []
})
export class MainSectionComponent implements OnInit {

  private _questions: Question[];
  private _questionsSelected: Question[];
  private _showPopup = false;
  private _showEditPopup = false;
  private _activeTab = 'question';
  searchQuery: string;
  searchDate: Date | undefined;
  searchOwner: boolean;

  constructor(
    private _questionService: QuestionService,
  ) {
    this._questions = [] as Question[];
    this._questionsSelected = [] as Question[];
    this._showPopup = false;
    this._showEditPopup = false;
    this._activeTab = 'question';
    this.searchQuery = '';
    this.searchDate = undefined;
    this.searchOwner = false;
  }

  ngOnInit(): void {
    this._questionService.getQuestions().subscribe(questions => {
      this._questions = questions;
    });
  }

  get questions(): Question[] {
    return this._questions;
  }

  get questionsSelected(): Question[] {
    return this._questionsSelected;
  }

  get showPopup(): boolean {
    return this._showPopup;
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
    this._showEditPopup = false;
  }

  changeActiveTab(): void {
    this._activeTab = this._activeTab === 'question' ? 'sondage' : 'question';
  }

}

