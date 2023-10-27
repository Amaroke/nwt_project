import { Component, Input } from '@angular/core';
import { Question } from '../shared/types/question.type';

@Component({
  selector: 'app-post-section',
  templateUrl: './post-section.component.html',
  styleUrls: []
})
export class PostSectionComponent {

  @Input() questionsSelected: Question[];

  constructor() {
    this.questionsSelected = [];
  }

  isOneQuestionSelected(): boolean {
    return this.questionsSelected.length == 1;
  }

  isSelectedNotEmpty(): boolean {
    return this.questionsSelected.length > 0;
  }

}
