import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule
  ]
})
export class ProfileModule { }
