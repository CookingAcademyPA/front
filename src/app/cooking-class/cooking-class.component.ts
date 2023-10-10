import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-cooking-class',
  templateUrl: './cooking-class.component.html',
  styleUrls: ['./cooking-class.component.css']
})
export class CookingClassComponent implements OnInit {
  services: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllServices();
  }

  getAllServices() {
    const apiUrl = 'https://cookingacademy.azurewebsites.net/api/services';

    this.http.get(apiUrl).subscribe(
      (data: any) => {
        this.services = data;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des services :', error);
      }
    );
  }


  // @ts-ignore
  /*services = [
    {
      title: 'Cours de Cuisine',
      description: 'Apprenez à cuisiner comme un chef.',
      price: 49.99,
      participants: 10,
      location: 'Studio de cuisine XYZ',
      date: '10 avril 2023, 14:00',
      duration: '3 heures',
      imageUrl: 'https://example.com/cuisine.jpg'
    },
    {
      title: 'Dégustation de Vin',
      description: 'Découvrez une sélection de vins exquis.',
      price: 29.99,
      participants: 20,
      location: 'Cave à vin ABC',
      date: '15 mai 2023, 18:30',
      duration: '2 heures',
      imageUrl: 'https://example.com/vin.jpg'
    },
    {
      title: 'Formation en Pâtisserie',
      description: 'Maîtrisez lart de la pâtisserie.',
      price: 79.99,
      participants: 8,
      location: 'École de pâtisserie XYZ',
      date: '5 juin 2023, 10:00',
      duration: '4 heures',
      imageUrl: 'https://example.com/patisserie.jpg'
    },
    {
      title: 'Location de Cuisine',
      description: 'Louez notre cuisine pour vos événements.',
      price: 149.99,
      participants: null,
      location: 'Cuisine événementielle XYZ',
      date: null,
      duration: null,
      imageUrl: 'https://example.com/location.jpg'
    }
  ];*/
}
