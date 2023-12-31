import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MenuModule} from "./menu/menu.module";
import {AppRoutingModule} from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FooterModule} from "./footer/footer.module";
import { RecipeComponent } from './recipe/recipe.component';
import { MealComponent } from './meal/meal.component';
import { CookingClassComponent } from './cooking-class/cooking-class.component';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from "./auth/auth.module";
import { ConnexionComponent } from './connexion/connexion.component';
import { MenuBlankComponent } from './menu-blank/menu-blank.component';
import { CartComponent } from './cart/cart.component';
import { NotifComponent } from './notif/notif.component';
import { AbonnementsComponent } from './abonnements/abonnements.component';
import {ToastrModule} from "ngx-toastr";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { InvoicesComponent } from './invoices/invoices.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    MealComponent,
    CookingClassComponent,
    ProductComponent,
    ConnexionComponent,
    MenuBlankComponent,
    CartComponent,
    NotifComponent,
    AbonnementsComponent,
    InvoicesComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MenuModule,
        FooterModule,
        AuthModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        MatProgressSpinnerModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
