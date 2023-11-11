import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  products: any[] = [];
  cartId = sessionStorage.getItem('cartId');

  private token = sessionStorage.getItem('token') || '';
  private header = new HttpHeaders()
    .set('Authorization', this.token)
    .set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.http.get(`${this.apiUrl}/products`).subscribe(
      (data: any) => {
        this.products = data;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des repas :', error);
      }
    );
  }

  buyProduct(productId: string, productName: string) {
    const body = {
      'cart_id': this.cartId,
      'product_id': productId,
      'quantity': 1
    }
    this.http.post(`${this.apiUrl}/buy/product/${productId}`, body, {headers: this.header}).subscribe(
      (data) => {
        this.toastr.success(`${productName} a été ajouté au panier.`, 'Succès');
      },
      (error) => {
        if (error.status === 400) {
          this.toastr.warning(`${productName} est déjà dans votre panier.`, 'Attention');
        }
      });
  }
}
