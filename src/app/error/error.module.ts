import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageEmptyComponent } from './page-empty/page-empty.component';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    PageEmptyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ErrorModule { }
