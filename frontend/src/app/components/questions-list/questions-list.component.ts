import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../../shared/types/question.type';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: []
})
export class QuestionsListComponent {
  @Input() questions: Question[];
  @Input() searchQuery: string;
  @Input() searchDate: Date | undefined;
  @Input() searchOwner: boolean;
  @Output() searchOwnerChange = new EventEmitter<boolean>();
  @Input() questionsSelected: Question[];
  questionTypes = ["Question Vrai/faux", "Question à réponse libre", "Question à choix multiples"];

  constructor() {
    this.questions = [];
    this.questionsSelected = [];
    this.searchQuery = '';
    this.searchDate = undefined;
    this.searchOwner = false;
  }

  toggleSelection(question: Question): void {
    if (this.isSelected(question)) {
      this.questionsSelected.splice(this.questionsSelected.indexOf(question), 1);
      return;
    }
    this.questionsSelected.push(question)
  }

  isSelected(question: Question): boolean {
    return this.questionsSelected.includes(question);
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

  filterQuestions() {
    return this.questions.filter((question) => {
      return (!this.searchOwner || question.owner === this.getUserConnected()) &&
        question.title.includes(this.searchQuery) &&
        !this.isDateBefore(question.date);
    });
  }

}