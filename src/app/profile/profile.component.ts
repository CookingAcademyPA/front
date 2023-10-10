import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    birthDate: '1990-01-01',
    address: '123 Rue de la Ville, 75001 Paris, France',
    subscription: 'Starter',
    password: 'motdepasse'
  };

  saveProfile() {
    // Logique pour enregistrer le profil de l'utilisateur
    console.log('Profil utilisateur enregistré :', this.user);
  }
}
