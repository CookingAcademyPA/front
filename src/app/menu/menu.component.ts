import { Component } from '@angular/core';
import {AuthentService} from "../authent.service";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private authService: AuthentService, private router: Router) {} // Injectez le service d'authentification

  logout(): void {
    this.authService.clearSession();
    this.router.navigate(['/']);
  }
}
