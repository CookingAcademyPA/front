import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent  implements OnInit {
  meals: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllMeals();
  }


  getAllMeals() {
    const apiUrl = 'https://cookingacademy.azurewebsites.net/api/meals';

    this.http.get(apiUrl).subscribe(
      (data: any) => {
        this.meals = data;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des repas :', error);
      }
    );
  }
}
