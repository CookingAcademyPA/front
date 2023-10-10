import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  products: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    const apiUrl = 'https://cookingacademy.azurewebsites.net/api/products';

    this.http.get(apiUrl).subscribe(
      (data: any) => {
        this.products = data;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des repas :', error);
      }
    );
  }
  /*products = [
    {
      name: 'Casserole en acier inoxydable',
      description: 'Casserole de qualité supérieure en acier inoxydable.',
      price: 49.99,
      imageUrl: 'https://example.com/casserole.jpg'
    },
    {
      name: 'Couteau de chef professionnel',
      description: 'Couteau de chef haut de gamme pour une découpe précise.',
      price: 89.99,
      imageUrl: 'https://example.com/couteau.jpg'
    },
    {
      name: 'Machine à café automatique',
      description: 'Machine à café élégante pour préparer des expressos parfaits.',
      price: 199.99,
      imageUrl: 'https://example.com/coffee-machine.jpg'
    }
  ];*/
}
