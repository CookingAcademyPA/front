import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

;

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
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
    this.http.post('https://cookingacademy.azurewebsites.net/api/auth/signup', requestBody)
      .subscribe(
        (response: any) => {
          // L'inscription a réussi, vous pouvez gérer ici la redirection et la notification
          console.log('Inscription réussie:', response);

          // Redirigez vers la page d'accueil
          this.router.navigate(['/home']);

          // Affichez une notification
          // Vous pouvez utiliser une librairie comme ngx-toastr pour les notifications
        },
        (error: any) => {
          // L'inscription a échoué, gérer les erreurs ici
          console.error('Erreur lors de l\'inscription:', error);
        }
      );
  }



}
