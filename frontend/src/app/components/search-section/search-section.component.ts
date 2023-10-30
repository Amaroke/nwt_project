import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: []
})
export class SearchSectionComponent {

  @Input() activeTab: string;
  @Output() activeTabChange = new EventEmitter<string>();

  constructor() {
    this.activeTab = 'question';
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.activeTabChange.emit();
  }


}
