import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthentService} from "../authent.service";

@Component({
  selector: 'app-abonnements',
  templateUrl: './abonnements.component.html',
  styleUrls: ['./abonnements.component.css']
})
export class AbonnementsComponent {
  abonnements = [
    {
      name: 'Free',
      price: 'Gratuit',
      advantages: ['Commenter, publier des avis', 'Accès aux leçons 1 fois par jours'],
    },
    {
      name: 'Starter',
      price: '9,90€ / mois ou 113€ / an',
      advantages: ['Pas de publicités', 'Accès aux leçons 5 fois par jours', 'Invitation à des événements exclusifs'],
    },
    {
      name: 'Master',
      price: '19€ / mois ou 220€ / an',
      advantages: ['Pas de publicités', 'Accès aux leçons illimitées', 'Invitation à des événements exclusifs', 'Livraison offerte sur la boutique'],
    },
  ];

  constructor(private http: HttpClient,private authService: AuthentService) {}

  souscrire(abonnementName: string) {
    let newSubscriptionId: number;

    // Déterminez le nouvel subscription_id en fonction de l'abonnement sélectionné
    switch (abonnementName) {
      case 'Free':
        newSubscriptionId = 1;
        break;
      case 'Starter':
        newSubscriptionId = 2;
        break;
      case 'Master':
        newSubscriptionId = 3;
        break;
      default:
        return;
    }
    const userId = sessionStorage.getItem('userId'); // Assurez-vous de l'implémenter

    if (!userId) {
      console.error('Impossible de récupérer l\'ID de l\'utilisateur');
      return;
    }
    const requestBody = { subscription_id: newSubscriptionId };
    const headers = new HttpHeaders({
      Authorization: `${sessionStorage.getItem('token')}`
    });

    this.http.put(`https://cookingacademy.azurewebsites.net/api/users/${userId}`, requestBody, { headers })
      .subscribe(
        () => {
          // La requête PUT a réussi, vous pouvez gérer la réponse ici
          console.log(`Souscription à l'abonnement : ${abonnementName}`);
        },
        (error) => {
          console.error('Erreur lors de la souscription à l\'abonnement :', error);
        }
      );

    console.log(`Souscription à l'abonnement : ${abonnementName}`);
  }

}
