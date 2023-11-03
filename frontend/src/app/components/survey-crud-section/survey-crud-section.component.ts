import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Survey } from 'src/app/shared/types/survey.type';
import { Question } from 'src/app/shared/types/question.type';
import { SurveyService } from 'src/app/shared/services/survey.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { QuestionService } from 'src/app/shared/services/question.service';
import { forkJoin, map } from 'rxjs';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-survey-crud-section',
  templateUrl: './survey-crud-section.component.html',
  styleUrls: []
})
export class SurveyCrudSectionComponent {

  @Input() surveySelected: Survey;
  @Input() surveys: Survey[];
  @Output() open = new EventEmitter<void>();
  @Output() openEdit = new EventEmitter<void>();

  constructor(private _surveyService: SurveyService, private _questionService: QuestionService) {
    this.surveySelected = {} as Survey;
    this.surveys = [];
  }

  isOneSurveySelected(): boolean {
    return this.surveySelected.id !== undefined;
  }

  openPopup(): void {
    this.open.emit();
  }

  openEditPopup(): void {
    this.openEdit.emit();
  }

  userIsConnected(): boolean {
    return localStorage.getItem('userId') ? true : false;
  }

  isSurveySelected(): boolean {
    return this.surveySelected.id !== undefined;
  }

  isDeletable(): boolean {
    return this.surveySelected.id !== undefined && localStorage.getItem('userId') === this.surveySelected.owner;
  }

  deleteSurvey(): void {
    if (this.surveySelected.id) {
      this._surveyService.deleteSurvey(this.surveySelected.id).subscribe(() => {
        this.surveys.splice(this.surveys.indexOf(this.surveySelected), 1);
        this.surveySelected = {} as Survey;
      });
    }
  }

  exportSurvey(): void {

    if (this.surveySelected.downloads === undefined)
      this.surveySelected.downloads = 1;
    else
      this.surveySelected.downloads++;

    if (this.surveySelected.id) {
      this._surveyService.downloadSurvey(this.surveySelected.id).subscribe(() => { });
      const docDefinition = {
        content: [
          this.surveySelected.title,
          "\n",
          this.surveySelected.description,
          "\n"
        ],
      };

      const questionObservables = this.surveySelected.questions.map((id, index) => {
        return this._questionService.getQuestion(id).pipe(
          map((question) => {
            docDefinition.content.push(`${index + 1} : ${question.content}`);
            if (question.type === 1) {
              docDefinition.content.push(`Entourez votre réponse : VRAI | FAUX`);
            }
            if (question.type === 2) {
              docDefinition.content.push(`Ecrivez votre réponse : _____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________`);
            }
            if (question.type === 3) {
              docDefinition.content.push(`Entourez votre réponse :   ${question.answers.join('    |   ')}`);
            }
          })
        );
      });

      forkJoin(questionObservables).subscribe(() => {
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        pdfDocGenerator.download('enquete.pdf');
      });
    }
  }

}
