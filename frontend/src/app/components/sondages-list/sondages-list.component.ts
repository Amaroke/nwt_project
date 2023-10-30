import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../../shared/types/question.type';

@Component({
  selector: 'app-sondages-list',
  templateUrl: './sondages-list.component.html',
  styleUrls: []
})
export class SondagesListComponent {
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

}