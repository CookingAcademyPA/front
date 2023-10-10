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

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    MealComponent,
    CookingClassComponent,
    ProductComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
