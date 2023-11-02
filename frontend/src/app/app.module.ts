import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroUserCircle } from '@ng-icons/heroicons/outline';
import { heroArrowRightOnRectangle } from '@ng-icons/heroicons/outline';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchSectionComponent } from './components/search-section/search-section.component';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { QuestionsListComponent } from './components/questions-list/questions-list.component';
import { QuestionCrudSectionComponent } from './components/question-crud-section/question-crud-section.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionCreatePopupComponent } from './components/question-create-popup/create-question-popup.component';
import { QuestionEditPopupComponent } from './components/question-edit-popup/question-edit-popup.component';
import { SondageCrudSectionComponent } from './components/sondage-crud-section/sondage-crud-section.component';
import { SondagesListComponent } from './components/sondages-list/sondages-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    FooterComponent,
    SearchSectionComponent,
    MainSectionComponent,
    QuestionsListComponent,
    QuestionCrudSectionComponent,
    LoginComponent,
    RegisterComponent,
    QuestionCreatePopupComponent,
    QuestionEditPopupComponent,
    SondageCrudSectionComponent,
    SondagesListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    NgIconsModule.withIcons({ heroArrowRightOnRectangle, heroUserCircle }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }