import { Component } from '@angular/core';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: []
})
export class SearchSectionComponent {
  activeTab = 'question'; // Initial tab is 'question'

  showSearch(tab: string) {
    this.activeTab = tab;
  }

}
