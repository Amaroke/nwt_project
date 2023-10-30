import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionService } from '../../shared/services/question.service';
import { Question } from '../../shared/types/question.type';

@Component({
  selector: 'app-question-create-popup',
  templateUrl: './create-question-popup.component.html',
  styleUrls: []
})
export class QuestionCreatePopupComponent {

  question: Question;
  @Input() questions: Question[];
  @Output() close = new EventEmitter<void>();

  constructor(private _questionService: QuestionService) {
    this.questions = [];
    this.question = {
      title: '',
      content: '',
      answers: [],
      type: -1,
      owner: localStorage.getItem('userId')?.toString() || '',
    };
  }

  saveQuestion() {
    this._questionService.createQuestion(this.question).subscribe(() => {
      this.closePopup();
      window.location.reload();
    });
  }

  closePopup(): void {
    this.close.emit();
  }
}
