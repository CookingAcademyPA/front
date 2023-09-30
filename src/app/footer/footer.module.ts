import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TermComponent} from './term/term.component';
import {FooterComponent} from './footer.component';
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    TermComponent,
    FooterComponent
  ],
  exports: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class FooterModule {
}
