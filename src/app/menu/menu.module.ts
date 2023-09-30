import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import {RouterLink} from "@angular/router";
import { MatIconModule } from '@angular/material/icon';



@NgModule({
    declarations: [
        MenuComponent
    ],
    exports: [
        MenuComponent
    ],
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
  ]
})
export class MenuModule { }
