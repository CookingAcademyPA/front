import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  showModal: boolean = false;
  cartItems: any[] = [
    {
      name: 'Produit 1',
      description: 'Description du produit 1',
      price: 20.0,
    },
    {
      name: 'Produit 2',
      description: 'Description du produit 2',
      price: 15.0,
    },
    {
      name: 'Produit 3',
      description: 'Description du produit 3',
      price: 25.0,
    },
  ];
  cartSummary: string = '';
  totalPrice: number = 0;
  deliveryAddress: string = '123 Main Street, City';
  // Calcule le total du panier
  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
  openModal(): void {
    this.showModal = true;
    this.calculateSummary();
  }

  // Méthode pour fermer la modal
  closeModal(): void {
    this.showModal = false;
  }
  calculateSummary(): void {
    this.cartSummary = this.cartItems.map(item => `${item.name} - ${item.price}`).join(', ');
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.price, 0);
  }
}
