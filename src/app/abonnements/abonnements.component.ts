import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthentService} from "../authent.service";

@Component({
  selector: 'app-abonnements',
  templateUrl: './abonnements.component.html',
  styleUrls: ['./abonnements.component.css']
})
export class AbonnementsComponent {
  user: any = {};
  paymentHandler: any = null;

  abonnements = [
    {
      id: 1,
      name: 'Free',
      price: 'Gratuit',
      advantages: ['Commenter, publier des avis', 'Accès aux leçons 1 fois par jours'],
    },
    {
      id: 2,
      name: 'Starter',
      price: '9,90€ / mois ou 113€ / an',
      advantages: ['Pas de publicités', 'Accès aux leçons 5 fois par jours', 'Invitation à des événements exclusifs'],
    },
    {
      id: 3,
      name: 'Master',
      price: '19€ / mois ou 220€ / an',
      advantages: ['Pas de publicités', 'Accès aux leçons illimitées', 'Invitation à des événements exclusifs', 'Livraison offerte sur la boutique'],
    },
  ];

  constructor(private http: HttpClient,private authService: AuthentService) {}
  ngOnInit() {
    this.invokeStripe();

    const userId = sessionStorage.getItem('userId');

    if (userId) {
      const apiUrl = `https://cookingacademy.azurewebsites.net/api/users/${userId}`;
      const headers = new HttpHeaders({
        Authorization: `${sessionStorage.getItem('token')}`
      });

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

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51O7GtdGbMLAE7m3ZvSVmlcnpIMEWF77j5eOtcw1UskTQRQEKI33Hzchgr6QboI34oDZBwEavRTyggKhhc1QlVPPa00ws3E3j3J',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('payment successfull!');
      },
    });
    paymentHandler.open({
      name: 'Cooking Academy',
      description: 'Abonnement',
      amount: amount * 100,
      currency: 'eur', // Définir la devise sur euros
      panelLabel: 'Payer {{amount}}',
      locale: 'auto',
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51O7GtdGbMLAE7m3ZvSVmlcnpIMEWF77j5eOtcw1UskTQRQEKI33Hzchgr6QboI34oDZBwEavRTyggKhhc1QlVPPa00ws3E3j3J',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

  souscrire(abonnementName: string) {

    let newSubscriptionId: number;
    let amount: any;

    // Déterminez le nouvel subscription_id en fonction de l'abonnement sélectionné
    switch (abonnementName) {
      case 'Free':
        newSubscriptionId = 1;
        amount = 0;
        break;
      case 'Starter':
        newSubscriptionId = 2;
        amount = 9.90;
        break;
      case 'Master':
        newSubscriptionId = 3;
        amount = 19;
        break;
      default:
        return;
    }
    if (newSubscriptionId !=1){
      this.makePayment(amount)
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
