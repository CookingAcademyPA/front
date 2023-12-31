import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterLink
  ]
})
export class HomeModule { }
