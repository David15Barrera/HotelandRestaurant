import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../models/reservation.interface';
import { ReservationService } from '../../services/reservation.service';
import { Room } from '../../../admin/models/room.model';
import { Hotel } from '../../models/hotel.interface';
import { RoomService } from '../../../admin/services/room.service';
import { HotelService } from '../../services/hotel.service';
import { forkJoin, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-ver-reservacion-cli',
  standalone: true,
  imports: [],
  templateUrl: './ver-reservacion-cli.component.html',
  styleUrl: './ver-reservacion-cli.component.scss'
})
export class VerReservacionCliComponent implements OnInit {
  reservations: (Reservation & { roomName?: string; hotelName?: string })[] = [];
  loading = true;

  constructor(
    private reservationService: ReservationService,
    private roomService: RoomService,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    const customerId = 'de851a7f-1232-4fb4-b549-0dcd7aa8bcd0'; // TODO: obtener del login
    this.reservationService.getReservationsByCustomer(customerId).subscribe({
      next: (data) => {
        const enrichedReservations$ = data.map(res =>
          this.roomService.getRoomById(res.roomId).pipe(
            // Obtenemos la habitación y luego el hotel
            switchMap((room: Room) => 
              this.hotelService.getHotelById(room.hotelId).pipe(
                map((hotel: Hotel) => ({
                  ...res,
                  totalPrice: this.calcularTotal(res),
                  roomName: `Habitación ${room.roomNumber}`,
                  hotelName: hotel.name
                }))
              )
            )
          )
        );

        forkJoin(enrichedReservations$).subscribe({
          next: (resWithNames) => {
            this.reservations = resWithNames;
            this.loading = false;
          },
          error: (err) => {
            console.error('Error al obtener reservaciones:', err);
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener reservaciones:', err);
        this.loading = false;
      }
    });
  }

  calcularTotal(reservation: Reservation): number {
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return diffDays * reservation.pricePerDay;
  }
}