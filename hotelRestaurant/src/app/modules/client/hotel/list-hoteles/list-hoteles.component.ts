import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../models/hotel.interface';
import { HotelService } from '../../services/hotel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-hoteles',
  standalone: true,
  imports: [],
  templateUrl: './list-hoteles.component.html',
  styleUrl: './list-hoteles.component.scss'
})
export class ListHotelesComponent implements OnInit {
  hotels: Hotel[] = [];
  loading = true;

  constructor(private hotelService: HotelService, private router: Router) {}

  ngOnInit(): void {
    this.hotelService.getHotels().subscribe({
      next: (data) => {
        this.hotels = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener hoteles:', err);
        this.loading = false;
      }
    });
  }

  verDetalles(id: string) {
    this.router.navigate(['client/hoteles-detail', id]);
  }
}