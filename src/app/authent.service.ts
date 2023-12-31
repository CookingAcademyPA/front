import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthentService {

  tokenInfos! : { [key: string]: string };
  private authToken: string = '';

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Méthode pour définir le jeton
  setToken(token: string): void {
    this.authToken = token;
  }

  // Méthode pour obtenir le jeton
  getToken(): string {
    return this.authToken;
  }
  clearToken() {
    this.authToken = '';
  }

  decodeToken() {
    if (this.authToken) {
      this.tokenInfos = decode(this.authToken);
    }
  }

  getUserId() {
    this.decodeToken();
    return this.tokenInfos ? this.tokenInfos : null;
  }

  getUserIdFromToken(): string | null {
    try {
      const decodedToken: any = decode(this.authToken);
      return decodedToken.userId; // Remplacez userId par la clé correcte dans votre jeton JWT
    } catch (error) {
      console.error('Erreur lors de la décodage du jeton :', error);
      return null;
    }
  }

  clearSession() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('cartId');
    this.http.get(`${this.apiUrl}/auth/logout`).subscribe(data => {
      sessionStorage.clear();
    });
  }

}
