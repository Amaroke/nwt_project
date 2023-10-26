import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: []
})
export class NavigationBarComponent implements OnInit {
  connectUser: any = localStorage.getItem('userFirstName');

  constructor(public userService: UserService) { }

  ngOnInit() {
    setInterval(() => {
      const newValue = localStorage.getItem('userFirstName');
      if (newValue !== this.connectUser) {
        this.connectUser = newValue;
      }
    }, 1000);
  }

  logout() {
    localStorage.setItem('userFirstName', '');
    localStorage.setItem('userId', '');
    this.connectUser = null;
  }
}
