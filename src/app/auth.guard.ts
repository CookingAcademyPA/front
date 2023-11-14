// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userSession = sessionStorage.getItem('token');

    if (userSession) {
      return true;
    }

    this.router.navigate(['/connexion']);
    return false;
  }
}
