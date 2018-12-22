import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleNotificationSidenav = new EventEmitter<void>();
  loggedUsername: string = localStorage.getItem('username');

  constructor(private router: Router) {
  }

  doLogout() {
    localStorage.clear();
    this.router.navigate ( [ '/' ] );
  }
}
