import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './signup/sign-up.component';
import { SignInComponent } from './signin/sign-in.component';
import {RouterLink} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { }
