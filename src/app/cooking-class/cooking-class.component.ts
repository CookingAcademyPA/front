import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-cooking-class',
  templateUrl: './cooking-class.component.html',
  styleUrls: ['./cooking-class.component.css']
})
export class CookingClassComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  services: any[] = [];
  cartId = sessionStorage.getItem('cartId') || '';

  token = sessionStorage.getItem('token') || '';
  private header = new HttpHeaders()
    .set('Authorization', this.token)
    .set('Content-Type', 'application/json');


  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getAllServices();
  }

  getAllServices() {
    this.http.get(`${this.apiUrl}/services`).subscribe(
      (data: any) => {
        this.services = data;
        this.services.forEach(service => {
          this.getRemainingPlaces(service.id).subscribe(
            remainingPlaces => service.remainingPlaces = service.number_of_person - remainingPlaces
          );
          this.getCartHasReserved(service.id).subscribe(
            hasReserved => service.hasReserved = hasReserved
          );
        });
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des services :', error);
      }
    );
  }

  buyService(serviceId: string, serviceName: string) {
    const body = {
      'cart_id': this.cartId,
      'service_id': serviceId,
      'quantity': 1
    }
    this.http.post(`${this.apiUrl}/buy/service/${serviceId}`, body, {headers: this.header}).subscribe(
      (data) => {
        this.toastr.success(`Réservation pour ${serviceName} effectuée.`, 'Succès');
      },
      (error) => {
        if (error.status === 400) {
          this.toastr.warning(`Réservation ${serviceName} déjà éffectuée.`, 'Attention');
        }
      });
  }

  getRemainingPlaces(serviceId: string): Observable<number> {
    return this.http.get(`${this.apiUrl}/services/${serviceId}/reservations`, {headers: this.header}).pipe(
      map((data: any) => data.length)
    );
  }

  getCartHasReserved(serviceId: string): Observable<boolean> {
    return this.http.get(`${this.apiUrl}/services/${serviceId}/reservations/${this.cartId}`, {headers: this.header}).pipe(
      map((data: any) => data.hasReservation)
    );
  }

  formatterDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', options);
  }
}
