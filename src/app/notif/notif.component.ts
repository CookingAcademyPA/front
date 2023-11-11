import { Component } from '@angular/core';
interface Notification {
  title: string;
  time: string;
  read: boolean;
}
@Component({
  selector: 'app-notif',
  templateUrl: './notif.component.html',
  styleUrls: ['./notif.component.css']
})

export class NotifComponent {
  notifications: Notification[] = [
    { title: 'Nouvelle recette disponible', time: 'Il y a 2 heures', read: false },
    { title: 'Promotion spéciale', time: 'Hier', read: false },
    { title: 'Offre spéciale sur les ustensiles de cuisine', time: 'Aujourd\'hui', read: false },
    { title: 'Cours de cuisine en ligne à prix réduit', time: 'Il y a 1 jour', read: false },
    { title: 'Découvrez nos nouveaux plats disponibles', time: 'Il y a 3 heures', read: false },
    { title: 'Publicité: Économisez 20% sur votre prochaine commande', time: 'Il y a 5 heures', read: false },
    // Ajoutez d'autres notifications au besoin
  ];



  removeNotification(index: number): void {
    this.notifications.splice(index, 1);
  }
}
