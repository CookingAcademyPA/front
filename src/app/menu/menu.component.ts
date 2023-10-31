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
    // Appelez la méthode de déconnexion pour effacer le token
    this.authService.clearToken();
    this.router.navigate(['/']);
  }
}
