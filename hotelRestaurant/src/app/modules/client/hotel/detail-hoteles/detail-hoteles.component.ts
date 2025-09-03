import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../models/hotel.interface';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-detail-hoteles',
  standalone: true,
  imports: [],
  templateUrl: './detail-hoteles.component.html',
  styleUrl: './detail-hoteles.component.scss'
})
export class DetailHotelesComponent implements OnInit {
  hotel?: Hotel;
  loading = true;

  constructor(private route: ActivatedRoute, private hotelService: HotelService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.hotelService.getHotelById(id).subscribe({
        next: (data) => {
          this.hotel = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al obtener detalle del hotel:', err);
          this.loading = false;
        }
      });
    }
  }
}