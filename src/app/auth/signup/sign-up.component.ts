import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  typeAccount = ['client', 'pro'];
  selectedOption: string = 'client';

  selectOption(option: string) {
    this.selectedOption = option;
  }
}
