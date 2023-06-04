import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent {
  constructor(private router: Router) {}
  logOut() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 200);
    }
  }
}
