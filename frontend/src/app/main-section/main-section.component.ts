import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../shared/services/question.service';
import { Question } from '../shared/types/question.type';


@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: []
})
export class MainSectionComponent implements OnInit {

  private _questions: Question[];
  private _questionsSelected: Question[];

  constructor(
    private _questionService: QuestionService,
  ) {
    this._questions = [] as Question[];
    this._questionsSelected = [] as Question[];
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

}

