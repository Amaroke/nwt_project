import { Component, Input } from '@angular/core';
import { Question } from '../shared/types/question.type';

@Component({
  selector: 'app-list-section',
  templateUrl: './list-section.component.html',
  styleUrls: []
})
export class ListSectionComponent {
  @Input() questions: Question[];

  constructor() {
    this.questions = [];
  }

}