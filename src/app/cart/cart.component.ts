import {Component, OnInit} from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
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

  cartId = sessionStorage.getItem('cartId');
  ngOnInit() {
  }

  // Calcule le total du panier
  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
  removeItem(index: number): void {
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
      // Recalculez le total après la suppression de l'élément
      this.calculateSummary();
    }
  }
  openModal(): void {
    this.generateInvoicePDF()

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
  generateInvoicePDF(): void {
    // Créez une instance de jsPDF
    const doc = new jsPDF.default();

    // Définissez le contenu du PDF (facture)
    doc.text('Facture de la commande', 10, 10);
    doc.text(`Adresse de livraison : ${this.deliveryAddress}`, 10, 20);
    // Ajoutez le contenu de la facture ici (articles, prix, quantité, total, etc.)
    let y = 40; // Position verticale initiale

    let total = 0; // Initialisez le total à zéro

    this.cartItems.forEach(item => {
      doc.text(`Nom de l'article : ${item.name}`, 10, y);
      y += 10;

      doc.text(`Description : ${item.description}`, 10, y);
      y += 10;

      doc.text(`Prix : ${item.price} EUR`, 10, y);
      y += 10;

      // Calculez le total pour cet article
      const itemTotal = item.price; // Ajoutez d'autres facteurs si nécessaire
      total += itemTotal;

      y += 10; // Augmentez la position verticale pour l'élément suivant
    });

    // Ajoutez le prix total à la facture
    doc.text(`Prix total : ${total} EUR`, 10, y);
    y += 10;
    // Enregistrez ou téléchargez le PDF
    doc.save('facture.pdf');
  }

}
