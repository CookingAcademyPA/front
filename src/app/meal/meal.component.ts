import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent  implements OnInit {
  private apiUrl = environment.apiUrl;
  meals: any[] = [];
  cartId = sessionStorage.getItem('cartId');

  private token = sessionStorage.getItem('token') || '';
  private header = new HttpHeaders()
    .set('Authorization', this.token)
    .set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit() {
    this.getAllMeals();
  }

  getAllMeals() {
    this.http.get(`${this.apiUrl}/meals`).subscribe(
      (data: any) => {
        this.meals = data;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des repas :', error);
      }
    );
  }

  buyMeal(mealId: string, mealName: string) {
    const body = {
      'cart_id': this.cartId,
      'meal_id': mealId,
      'quantity': 1
    }
    this.http.post(`${this.apiUrl}/buy/meal/${mealId}`, body, {headers: this.header}).subscribe(
      (data) => {
        this.toastr.success(`${mealName} a été ajouté au panier.`, 'Succès');
      },
      (error) => {
        if (error.status === 400) {
          this.toastr.warning(`${mealName} est déjà dans votre panier.`, 'Attention');
        }
      });
  }
}
