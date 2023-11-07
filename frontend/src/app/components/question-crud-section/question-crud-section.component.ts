import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../../shared/types/question.type';
import { QuestionService } from '../../shared/services/question.service';

@Component({
  selector: 'app-question-crud-section',
  templateUrl: './question-crud-section.component.html',
  styleUrls: []
})
export class QuestionCrudSectionComponent {

  @Input() questionsSelected: Question[];
  @Input() questions: Question[];
  @Output() open = new EventEmitter<void>();
  @Output() openEdit = new EventEmitter<void>();
  @Output() openPopupSurvey = new EventEmitter<void>();

  constructor(private _questionService: QuestionService) {
    this.questionsSelected = [];
    this.questions = [];
  }

  isOneQuestionSelected(): boolean {
    return this.questionsSelected.length == 1;
  }

  isSelectedNotEmpty(): boolean {
    return this.questionsSelected.length > 0;
  }

  unselectAll(): void {
    this.questionsSelected.splice(0, this.questionsSelected.length);
  }

  deleteQuestion(): void {
    if (this.questionsSelected[0]) {
      const questionId = this.questionsSelected[0].id;
      if (questionId) {
        this.questions.splice(this.questions.indexOf(this.questionsSelected[0]), 1);
        this._questionService.deleteQuestion(questionId).subscribe(() => {
          this.unselectAll();
        });
      }
    }
  }

  openPopup(): void {
    this.open.emit();
  }

  openEditPopup(): void {
    this.openEdit.emit();
  }

  openSurvey(): void {
    this.openPopupSurvey.emit();
  }

  userIsConnected(): boolean {
    return localStorage.getItem('userId') ? true : false;
  }

  isDeletable(): boolean {
    return this.questionsSelected.length == 1 && localStorage.getItem('userId') === this.questionsSelected[0].owner;
  }

  isEditable(): boolean {
    return this.questionsSelected.length == 1 && localStorage.getItem('userId') === this.questionsSelected[0].owner;
  }
}
