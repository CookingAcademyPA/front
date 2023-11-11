import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'cookingacademy-front';

  isHomePageRoute(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/connexion' || currentRoute === '/signin' || currentRoute === '/signup';
  }
}
