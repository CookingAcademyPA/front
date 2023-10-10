import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit{
  recipes: any[] = [];

  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.getAllRecipes();
  }
  getAllRecipes() {
    const apiUrl = 'https://cookingacademy.azurewebsites.net/api/recipes';

    this.http.get(apiUrl).subscribe(
      (data: any) => {
        this.recipes = data;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des recettes :', error);
      }
    );
  }
  /*recipes = [
    {
      name: 'Spaghetti Bolognese',
      description: 'Une délicieuse recette de spaghetti avec une sauce bolognaise maison.',
      imageUrl: 'https://example.com/spaghetti.jpg'
    },
    {
      name: 'Salade César',
      description: 'Une salade croustillante avec des croûtons, du parmesan et une vinaigrette crémeuse.',
      imageUrl: 'https://example.com/caesarsalad.jpg'
    },
    {
      name: 'Tarte aux Pommes',
      description: 'Une tarte sucrée aux pommes avec une croûte dorée et croustillante.',
      imageUrl: 'https://example.com/applepie.jpg'
    }
  ];*/
}
