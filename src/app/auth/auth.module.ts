import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './signup/sign-up.component';
import { SignInComponent } from './signin/sign-in.component';
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class AuthModule { }
