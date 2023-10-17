import { Component } from '@angular/core';
import {AuthentService} from "../authent.service";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: any = {};
  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthentService
  ) {}
  ngOnInit(): void {
    // Obtenez l'ID de l'utilisateur à partir du jeton
    const userId = this.authService.getUserIdFromToken();

    if (userId) {
      // Construisez l'URL de l'API en utilisant l'ID de l'utilisateur
      const apiUrl = `https://cookingacademy.azurewebsites.net/api/users/${userId}`;

      // Définissez les en-têtes avec le jeton JWT
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`
      });

      // Effectuez une requête HTTP GET pour obtenir les données de l'utilisateur
      this.http.get(apiUrl, { headers }).subscribe(
        (userData: any) => {
          this.user = userData;
        },
        (error) => {
          console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
        }
      );
    }
  }



  saveProfile() {
    // Logique pour enregistrer le profil de l'utilisateur
    console.log('Profil utilisateur enregistré :', this.user);
  }
  test() {
    console.log(this.authService.getToken());
    console.log(this.authService.getUserIdFromToken());
  }
}
