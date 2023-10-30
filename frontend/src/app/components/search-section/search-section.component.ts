import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: []
})
export class SearchSectionComponent {

  @Input() activeTab: string;
  @Input() searchQuery: string;
  @Output() searchQueryChange = new EventEmitter<string>();
  @Input() searchDate: Date | undefined;
  @Output() searchDateChange = new EventEmitter<Date | undefined>();
  @Input() searchOwner: boolean;
  @Output() searchOwnerChange = new EventEmitter<boolean>();
  @Output() activeTabChange = new EventEmitter<string>();

  constructor() {
    this.activeTab = 'question';
    this.searchQuery = '';
    this.searchDate = undefined;
    this.searchOwner = false;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.activeTabChange.emit();
  }

  setSearchOwner(event: any) {
    this.searchOwner = event.target.checked;
    this.searchOwnerChange.emit(this.searchOwner);
  }

  setSearchQuery(event: any) {
    this.searchQuery = event.target.value;
    this.searchQueryChange.emit(this.searchQuery);
  }

  setSearchDate(event: any) {
    this.searchDate = event.target.value;
    this.searchDateChange.emit(this.searchDate);
  }

}
