import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./error/page-not-found/page-not-found.component";
import {ShopComponent} from "./shop/shop.component";
import {ProfileComponent} from "./profile/profile.component";
import {PageEmptyComponent} from "./error/page-empty/page-empty.component";
import {SignInComponent} from "./auth/signin/sign-in.component";
import {SignUpComponent} from "./auth/signup/sign-up.component";
import {TermComponent} from "./footer/term/term.component";
import {RecipeComponent} from "./recipe/recipe.component";
import {MealComponent} from "./meal/meal.component";
import {CookingClassComponent} from "./cooking-class/cooking-class.component";
import {ProductComponent} from "./product/product.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'recipe', component: RecipeComponent },
  { path: 'meal', component: MealComponent },
  { path: 'cooking-class', component: CookingClassComponent },
  { path: 'product', component: ProductComponent },
  { path: 'notifications', component: PageEmptyComponent },
  { path: 'messages', component: PageEmptyComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'terms', component: TermComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent } // Route pour la page non trouvée
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
