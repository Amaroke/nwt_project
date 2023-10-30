import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroUserCircle } from '@ng-icons/heroicons/outline';
import { heroArrowRightOnRectangle } from '@ng-icons/heroicons/outline';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchSectionComponent } from './search-section/search-section.component';
import { MainSectionComponent } from './main-section/main-section.component';
import { ListSectionComponent } from './list-section/list-section.component';
import { PostSectionComponent } from './post-section/post-section.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionPopupComponent } from './create-question-popup/create-question-popup.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    FooterComponent,
    SearchSectionComponent,
    MainSectionComponent,
    ListSectionComponent,
    PostSectionComponent,
    LoginComponent,
    RegisterComponent,
    QuestionPopupComponent
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
