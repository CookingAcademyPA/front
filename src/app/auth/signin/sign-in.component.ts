import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthentService} from "../../authent.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient, private authent: AuthentService) {
  }

  onSubmit(): void {
    const formData = {
      email: this.email,
      password: this.password
    };

    // En-têtes pour la requête HTTP (si nécessaire)
    const header = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    this.http.post<any>('https://cookingacademy.azurewebsites.net/api/auth/login', formData, { headers: header })
      .subscribe(
        (response) => {
          // En cas de succès, le serveur renvoie un token.
          // Vous pouvez stocker ce token dans un service d'authentification ou dans un cookie sécurisé.
          this.authent.setToken(response.token);
          sessionStorage.setItem('token', response.token);
          const userId = this.authent.getUserIdFromToken();

          // Redirigez l'utilisateur vers la page d'accueil (/home).
          this.router.navigate(['/home']);
        },
        (error) => {
          // En cas d'échec de la connexion, gérez l'erreur ici (par exemple, affichez un message d'erreur à l'utilisateur).
          this.errorMessage = 'Erreur de connexion. Veuillez vérifier vos informations.';
          console.error('Erreur de connexion :', error);
        }
      );
  }



}
