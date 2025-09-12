import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../models/restaurant.model';
import { RestaurantService } from '../../services/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-restaurantes',
  standalone: true,
  imports: [],
  templateUrl: './list-restaurantes.component.html',
  styleUrl: './list-restaurantes.component.scss'
})
export class ListRestaurantesComponent implements OnInit{

restaurant: Restaurant[] = [];
loading = true;

  constructor(private restaurnatService: RestaurantService, private router: Router) {}

  ngOnInit(): void {
    this.restaurnatService.getAll().subscribe({
      next: (data) => {
        this.restaurant = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar restaurantes:', err);
        this.loading = false;
      }
    });
  }

  verDetalles(id: string) {
    this.router.navigate(['client/restaurant-details', id]);
  }
}
