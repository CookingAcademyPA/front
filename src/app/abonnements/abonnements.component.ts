import { Component } from '@angular/core';

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

}
