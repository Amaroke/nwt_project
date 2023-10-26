import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: []
})
export class NavigationBarComponent {
  
  constructor(public authService: AuthService,public userService: UserService) {
  
  }
  logout() {
    this.authService.logout();
    
  }


}
