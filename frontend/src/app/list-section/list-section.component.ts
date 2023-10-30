import { Component, Input } from '@angular/core';
import { Question } from '../shared/types/question.type';

@Component({
  selector: 'app-list-section',
  templateUrl: './list-section.component.html',
  styleUrls: []
})
export class ListSectionComponent {
  @Input() questions: Question[];
  @Input() questionsSelected: Question[];
  questionTypes = ["Question à choix multiples", "Question Vrai/faux", "Question à réponse libre"];

  constructor() {
    this.questions = [];
    this.questionsSelected = [];
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
}