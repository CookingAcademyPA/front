import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./error/page-not-found/page-not-found.component";
import {ProfileComponent} from "./profile/profile.component";
import {PageEmptyComponent} from "./error/page-empty/page-empty.component";
import {SignInComponent} from "./auth/signin/sign-in.component";
import {SignUpComponent} from "./auth/signup/sign-up.component";
import {TermComponent} from "./footer/term/term.component";
import {RecipeComponent} from "./recipe/recipe.component";
import {MealComponent} from "./meal/meal.component";
import {CookingClassComponent} from "./cooking-class/cooking-class.component";
import {ProductComponent} from "./product/product.component";
import {CartComponent} from "./cart/cart.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {NotifComponent} from "./notif/notif.component";
import {AbonnementsComponent} from "./abonnements/abonnements.component";
import {InvoicesComponent} from "./invoices/invoices.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'recipe', canActivate: [AuthGuard],  component: RecipeComponent },
  { path: 'meal', canActivate: [AuthGuard],  component: MealComponent },
  { path: 'cooking-class', canActivate: [AuthGuard],  component: CookingClassComponent },
  { path: 'product', canActivate: [AuthGuard],  component: ProductComponent },
  { path: 'notifications', canActivate: [AuthGuard],  component: NotifComponent },
  { path: 'messages', canActivate: [AuthGuard],  component: PageEmptyComponent },
  { path: 'profile', canActivate: [AuthGuard],  component: ProfileComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'terms', component: TermComponent },
  {path: 'connexion', component: ConnexionComponent},
  { path: 'cart', canActivate: [AuthGuard],  component: CartComponent},
  { path: 'abonnements', canActivate: [AuthGuard],  component: AbonnementsComponent},
  { path: 'invoices', canActivate: [AuthGuard],  component: InvoicesComponent},
  { path: '', redirectTo: '/connexion', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent } // Route pour la page non trouvée
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
