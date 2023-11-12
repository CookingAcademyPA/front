import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  private apiUrl = environment.apiUrl;
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router) {

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      birthday_date: ['', Validators.required],
      street: ['', Validators.required],
      postal_code: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.registerForm.invalid){
      return;
    }
    const requestBody = {
      'subscription_id': 1,
      'is_admin': false,
      ...this.registerForm.value
    };
    this.http.post(`${this.apiUrl}/auth/signup`, requestBody)
      .subscribe(
        (response: any) => {
          // L'inscription a réussi, vous pouvez gérer ici la redirection et la notification
          console.log('Inscription réussie:', response);

          // Redirigez vers la page d'accueil
          this.router.navigate(['/signin']);

          // Affichez une notification
        },
        (error: any) => {
          console.error('Erreur lors de l\'inscription:', error);
        }
      );
  }



}
