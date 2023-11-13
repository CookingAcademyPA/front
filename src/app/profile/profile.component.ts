import {Component, NgModule} from '@angular/core';
import {AuthentService} from "../authent.service";
import {Router, RouterModule} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  private apiUrl = environment.apiUrl;
  cartId = sessionStorage.getItem('cartId');
  private token = sessionStorage.getItem('token') || '';
  private userId = sessionStorage.getItem('userId') || '';
  private header = new HttpHeaders()
    .set('Authorization', this.token)
    .set('Content-Type', 'application/json');
  user: any = {};
  cartPaid: any[] = [];
  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthentService
  ) {}
  ngOnInit(): void {
    // Obtenez l'ID de l'utilisateur à partir du jeton
    const userId = sessionStorage.getItem('userId');

    if (userId) {
      // Construisez l'URL de l'API en utilisant l'ID de l'utilisateur
      const apiUrl = `${this.apiUrl}/users/${userId}`;

      // Définissez les en-têtes avec le jeton JWT
      const headers = new HttpHeaders({
        Authorization: `${sessionStorage.getItem('token')}`
      });

      console.log(headers);

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
  getSubscriptionName(): string {
    switch (this.user.subscription_id) {
      case 1:
        return 'Free';
      case 2:
        return 'Starter';
      case 3:
        return 'Master';
      default:
        return 'Inconnu';
    }
  }
  redirectToAbonnements() {
    this.router.navigate(['/abonnements']); // Effectue la redirection
  }
  redirectToInvoices() {
    this.router.navigate(['/invoices']); // Effectue la redirection
  }
}
