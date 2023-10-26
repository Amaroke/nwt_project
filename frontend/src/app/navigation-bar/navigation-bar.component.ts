import { Component } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: []
})
export class NavigationBarComponent {

  connectUser: any = localStorage.getItem('userId');

  constructor(public userService: UserService) {

  }

  logout() {
    localStorage.removeItem('userId');
    this.connectUser = null;
  }


}
