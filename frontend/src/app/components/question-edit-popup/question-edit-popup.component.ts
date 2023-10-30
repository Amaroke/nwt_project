import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionService } from '../../shared/services/question.service';
import { Question } from '../../shared/types/question.type';

@Component({
  selector: 'app-question-edit-popup',
  templateUrl: './question-edit-popup.component.html',
  styleUrls: []
})
export class QuestionEditPopupComponent {

  @Input() question: Question;
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
    if (this.question.id) {
      this._questionService.updateQuestion(this.question.id, this.question).subscribe(() => {
        this.closePopup();
        window.location.reload();
      });
    }
  }

  closePopup(): void {
    this.close.emit();
  }
}
