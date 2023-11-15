import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthentService} from "../../authent.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  private API_URL = environment.apiUrl;

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

    this.http.post<any>(`${this.API_URL}/auth/login`, formData)
      .subscribe(
        (response) => {
          if (response === null) {
            sessionStorage.clear();
            return;
          }
          const token = response.token;
          sessionStorage.setItem('token', token);
          const userId = this.getUserId(response.token).userId;
          sessionStorage.setItem('userId', userId);

          const header = new HttpHeaders()
            .set('Authorization', token)
            .set('Content-Type', 'application/json');
          this.http.get<any>(`${this.API_URL}/users/${userId}/cart`, {headers: header}).subscribe(
            (cartData) => {
              sessionStorage.setItem('cartId', cartData[0].id);
            },
            (error) => {
              const body = {
                'user_id': userId
              };
              this.http.post<any>(`${this.API_URL}/carts`, body, {headers: header}).subscribe((cartData) => {
                this.http.get<any>(`${this.API_URL}/users/${userId}/cart`, {headers: header}).subscribe(
                  (cartData) => {
                    sessionStorage.setItem('cartId', cartData[0].id);
                  }
                );
              });
            }
          );

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

  getUserId(token: string): any {
    this.authent.setToken(token);
    this.authent.decodeToken();
    return this.authent.getUserId();
  }

}
