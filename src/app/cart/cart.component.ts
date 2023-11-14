import {Component, OnInit} from '@angular/core';
import * as jsPDF from 'jspdf';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  cartId = sessionStorage.getItem('cartId');
  private token = sessionStorage.getItem('token') || '';
  private userId = sessionStorage.getItem('userId') || '';
  private header = new HttpHeaders()
    .set('Authorization', this.token)
    .set('Content-Type', 'application/json');
  user: any = {};
  productsCart: any[] = [];
  products: any[] = [];
  mealsCart: any[] = [];
  meals: any[] = [];
  servicesCart: any[] = [];
  services: any[] = [];
  cartSummary: string = '';
  totalPrice: number = 0;
  paymentHandler: any = null;
  isLoading = true;

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit() {
    this.getAllProducts();
    this.getAllMeals();
    this.getAllServices();
    this.getUser();
    this.invokeStripe();
  }

  //#region Get Product/Meal/Service from cart
  getAllProducts() {
    this.http.get(`${this.apiUrl}/carts/${this.cartId}/product`, {headers: this.header}).subscribe(
      (data: any) => {
        this.productsCart = data;
        this.productsCart.forEach(product => {
          this.getProductFromCart(product.product_id);
        });
        this.isLoading = false;
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

  getAllMeals() {
    this.http.get(`${this.apiUrl}/carts/${this.cartId}/meal`, {headers: this.header}).subscribe(
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

  getAllServices() {
    this.http.get(`${this.apiUrl}/carts/${this.cartId}/service`, {headers: this.header}).subscribe(
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


  // Calcule le total du panier
  calculateTotal(): number {
    return this.products.reduce((total, item) => total + item.price, 0) + this.meals.reduce((total, item) => total + item.price, 0) + this.services.reduce((total, item) => total + item.price, 0);
  }

  removeProduct(productId: number): void {
    this.http.delete(`${this.apiUrl}/carts/${this.cartId}/product/${productId}`, {headers: this.header}).subscribe(
      (data: any) => {
        window.location.reload();
        this.getAllProducts();
        this.calculateSummary();
      },
      (error) => {
        window.location.reload();
        console.error('Une erreur s\'est produite lors de la suppression du plat :', error);
        this.getAllProducts();
        this.calculateSummary();
      }
    )
  }
  removeMeal(mealId: number): void {
    this.http.delete(`${this.apiUrl}/carts/${this.cartId}/meal/${mealId}`, {headers: this.header}).subscribe(
      (data: any) => {
        window.location.reload();
        this.getAllMeals();
        this.calculateSummary();
      },
      (error) => {
        window.location.reload();
        console.error('Une erreur s\'est produite lors de la suppression du plat :', error);
        this.getAllMeals();
        this.calculateSummary();
      }
    )
  }
  removeService(serviceId: number): void {
    this.http.delete(`${this.apiUrl}/carts/${this.cartId}/service/${serviceId}`, {headers: this.header}).subscribe(
      (data: any) => {
        window.location.reload();
        this.getAllServices();
        this.calculateSummary();
      },
      (error) => {
        window.location.reload();
        console.error('Une erreur s\'est produite lors de la suppression du plat :', error);
        this.getAllServices();
        this.calculateSummary();
      }
    )
  }

  GenerateInvoice(): void {
    this.calculateSummary();
    this.makePayment(this.totalPrice).then(() => {
      this.generateInvoicePDF();
      this.updateCartState();
      this.createNewCart().then(() => {
        this.toastr.success('Votre panier a été payé.', 'Succès');
        this.router.navigate(['/profile']);
      });
    }).catch((error) => {
      console.error("Erreur de paiement :", error);
    });
  }

  calculateSummary(): void {
    this.cartSummary = this.products.map(item => `${item.name} - ${item.price}`).join(', ')
      + this.meals.map(item => `${item.name} - ${item.price}`).join(', ')
      + this.services.map(item => `${item.title} - ${item.price}`).join(', ');
    this.totalPrice = this.products.reduce((total, item) => total + item.price, 0)
      + this.meals.reduce((total, item) => total + item.price, 0)
      + this.services.reduce((total, item) => total + item.price, 0);
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

  makePayment(amount: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const paymentHandler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51O7GtdGbMLAE7m3ZvSVmlcnpIMEWF77j5eOtcw1UskTQRQEKI33Hzchgr6QboI34oDZBwEavRTyggKhhc1QlVPPa00ws3E3j3J',
        locale: 'auto',
        token: (stripeToken: any) => {
          console.log(stripeToken);
          resolve();
        },
      });
      paymentHandler.open({
        name: 'Cooking Academy',
        description: 'Payment',
        amount: amount * 100,
        currency: 'eur',
        panelLabel: 'Payer {{amount}}',
        locale: 'auto',
      });
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51O7GtdGbMLAE7m3ZvSVmlcnpIMEWF77j5eOtcw1UskTQRQEKI33Hzchgr6QboI34oDZBwEavRTyggKhhc1QlVPPa00ws3E3j3J',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

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

  updateCartState(): void {
    const body = {
      'state': 'PAID'
    }
    this.http.put(`${this.apiUrl}/carts/${this.cartId}`, body, {headers: this.header}).subscribe(
      (data: any) => {
        if (data.state === 'PAID') {
          this.toastr.success('Votre panier a été payé.', 'Succès');
        }
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération du panier :', error);
        this.toastr.error('Un problème est survenu lors du paiement de votre panier.');
      }
    );
  }

  createNewCart(): Promise<void> {
    return new Promise((resolve, reject) => {
      const body = {
        'user_id': this.userId
      };
      this.http.post<any>(`${this.apiUrl}/carts`, body, {headers: this.header}).subscribe((cartData) => {
        this.http.get<any>(`${this.apiUrl}/users/${this.userId}/cart`, {headers: this.header}).subscribe(
          (cartData) => {
            sessionStorage.setItem('cartId', cartData[0].id);
          }
        );
      });
      resolve();
    });
  }

}
