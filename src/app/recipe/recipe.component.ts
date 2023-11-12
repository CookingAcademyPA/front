import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit{
  private apiUrl = environment.apiUrl;
  recipes: any[] = [];

  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.getAllRecipes();
  }
  getAllRecipes() {
    this.http.get(`${this.apiUrl}/recipes`).subscribe(
      (data: any) => {
        this.recipes = data;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des recettes :', error);
      }
    );
  }
}
