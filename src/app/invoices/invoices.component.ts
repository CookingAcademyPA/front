import { Component } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent {
  private apiUrl = environment.apiUrl;
  private token = sessionStorage.getItem('token') || '';
  private userId = sessionStorage.getItem('userId') || '';
  private header = new HttpHeaders()
    .set('Authorization', this.token)
    .set('Content-Type', 'application/json');
  cartPaid: any[] = [];
  user: any = {};
  productsCart: any[] = [];
  products: any[] = [];
  mealsCart: any[] = [];
  meals: any[] = [];
  servicesCart: any[] = [];
  services: any[] = [];
  cartSummary: string = '';
  totalPrice: number = 0;

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.getCartPaid();
    this.getUser();
  }
  downloadInvoicePdf(invoiceId: number): void {
    this.getAllProducts(invoiceId);
    this.getAllMeals(invoiceId);
    this.getAllServices(invoiceId);
    this.generateInvoicePDF();
    console.log(`Téléchargement du PDF pour la facture avec l'ID : ${invoiceId}`);
  }

  getCartPaid(): void {
    this.http.get(`${this.apiUrl}/users/${this.userId}/carts/paid`, {headers: this.header}).subscribe(
      (data: any) => {
        this.cartPaid = data;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des produits :', error);
      }
    );
  }

  getUser(): void {
    // Effectuez une requête HTTP GET pour obtenir les données de l'utilisateur
    this.http.get(`${this.apiUrl}/users/${this.userId}`, {headers: this.header}).subscribe(
      (userData: any) => {
        this.user = userData;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
      }
    );
  }

  //#region Get Product/Meal/Service from cart
  getAllProducts(cartId: number) {
    this.http.get(`${this.apiUrl}/carts/${cartId}/product`, {headers: this.header}).subscribe(
      (data: any) => {
        this.productsCart = data;
        this.productsCart.forEach(product => {
          this.getProductFromCart(product.product_id);
        });
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des produits :', error);
      }
    );
  }

  getProductFromCart(id: number) {
    this.http.get(`${this.apiUrl}/products/${id}`, {headers: this.header}).subscribe(
      (data: any) => {
        this.products.push(data);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des produits :', error);
      }
    );
  }

  getAllMeals(cartId: number) {
    this.http.get(`${this.apiUrl}/carts/${cartId}/meal`, {headers: this.header}).subscribe(
      (data: any) => {
        this.mealsCart = data;
        this.mealsCart.forEach(meal => {
          this.getMealFromCart(meal.meal_id);
        })
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des produits :', error);
      }
    );
  }

  getMealFromCart(id: number) {
    this.http.get(`${this.apiUrl}/meals/${id}`, {headers: this.header}).subscribe(
      (data: any) => {
        this.meals.push(data);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des produits :', error);
      }
    );
  }

  getAllServices(cartId: number) {
    this.http.get(`${this.apiUrl}/carts/${cartId}/service`, {headers: this.header}).subscribe(
      (data: any) => {
        this.servicesCart = data;
        this.servicesCart.forEach(service => {
          this.getServiceFromCart(service.service_id);
        })
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des produits :', error);
      }
    );
  }

  getServiceFromCart(id: number) {
    this.http.get(`${this.apiUrl}/services/${id}`, {headers: this.header}).subscribe(
      (data: any) => {
        this.services.push(data);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des produits :', error);
      }
    );
  }

//#endregion

  generateInvoicePDF(): void {
    // Créez une instance de jsPDF
    const doc = new jsPDF.default();

    // Définissez le contenu du PDF (facture)
    doc.text('Facture de la commande', 10, 10);
    doc.text(`Nom : ${this.user.last_name}`, 10, 20);
    doc.text(`Prenom : ${this.user.first_name}`, 10, 30);
    doc.text(`Adresse : ${this.user.street}`, 10, 40);
    doc.text(`Code postal : ${this.user.postal_code}`, 10, 50);
    doc.text(`Ville : ${this.user.city}`, 10, 60);
    doc.text(`Pays : ${this.user.country}`, 10, 70);

    // Ajoutez le contenu de la facture ici (articles, prix, quantité, total, etc.)
    let y = 90; // Position verticale initiale

    let total = 0; // Initialisez le total à zéro

    this.products.forEach(item => {
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

    this.meals.forEach(item => {
      doc.text(`Nom de l'article : ${item.name}`, 10, y);
      y += 10;
      doc.text(`Description : ${item.description}`, 10, y);
      y += 10;
      doc.text(`Prix : ${item.price} EUR`, 10, y);
      y += 10;
      const itemTotal = item.price; // Ajoutez d'autres facteurs si nécessaire
      total += itemTotal;
      y += 10;
    })

    this.services.forEach(item => {
      doc.text(`Nom de l'article : ${item.title}`, 10, y);
      y += 10;
      doc.text(`Description : ${item.description}`, 10, y);
      y += 10;
      doc.text(`Prix : ${item.price} EUR`, 10, y);
      y += 10;
      const itemTotal = item.price; // Ajoutez d'autres facteurs si nécessaire
      total += itemTotal;
      y += 10;
    })

    // Ajoutez le prix total à la facture
    doc.text(`Prix total : ${total.toFixed(2)} EUR`, 10, y);
    y += 10;
    // Enregistrez ou téléchargez le PDF
    doc.save('facture.pdf');
  }

}
