import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroUserCircle } from '@ng-icons/heroicons/outline';
import { heroArrowRightOnRectangle } from '@ng-icons/heroicons/outline';
import { FooterComponent } from './footer/footer.component';
import { SearchSectionComponent } from './search-section/search-section.component';
import { MainSectionComponent } from './main-section/main-section.component';
import { ListSectionComponent } from './list-section/list-section.component';
import { PostSectionComponent } from './post-section/post-section.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    NavigationBarComponent,
    FooterComponent,
    SearchSectionComponent,
    MainSectionComponent,
    ListSectionComponent,
    PostSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIconsModule.withIcons({ heroArrowRightOnRectangle, heroUserCircle }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
