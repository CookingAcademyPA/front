import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  products = [
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
  ];
}
