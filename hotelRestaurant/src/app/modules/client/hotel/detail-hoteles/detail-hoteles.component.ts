import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../models/hotel.interface';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import { Room } from '../../../admin/models/room.model';
import { RoomService } from '../../../admin/services/room.service';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-detail-hoteles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-hoteles.component.html',
  styleUrl: './detail-hoteles.component.scss'
})
export class DetailHotelesComponent implements OnInit {
  hotel?: Hotel;
  rooms: Room[] = [];
  loading = true;

   // Almacenar fechas seleccionadas por habitación
  selectedDates: { [roomId: string]: { startDate: string; endDate: string } } = {};

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private roomService: RoomService,
    private reservationService: ReservationService
  ) {}

 ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.hotelService.getHotelById(id).subscribe({
        next: (data) => {
          this.hotel = data;
          this.loadRooms();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al obtener detalle del hotel:', err);
          this.loading = false;
        }
      });
    }
  }

  loadRooms(): void {
    this.roomService.getRooms().subscribe({
      next: (allRooms) => {
        if (this.hotel) {
          this.rooms = allRooms.filter(
            (room) => room.hotelId?.toLowerCase() === this.hotel?.id.toLowerCase()
          );

          // inicializamos las fechas para cada habitación
          this.rooms.forEach((room) => {
            this.selectedDates[room.id!] = {
              startDate: '',
              endDate: ''
            };
          });
        }
      },
      error: (err) => {
        console.error('Error al obtener habitaciones:', err);
      }
    });
  }

reservar(room: Room): void {
  const fechas = this.selectedDates[room.id!];

  if (!fechas.startDate || !fechas.endDate) {
    alert('Por favor selecciona las fechas de inicio y fin.');
    return;
  }

  if (new Date(fechas.endDate) <= new Date(fechas.startDate)) {
    alert('La fecha de fin debe ser mayor a la fecha de inicio.');
    return;
  }

  const reservation: Reservation = {
    customerId: 'de851a7f-1232-4fb4-b549-0dcd7aa8bcd0',
    roomId: room.id!,
    startDate: fechas.startDate,
    endDate: fechas.endDate,
    state: 'ocupada',
    pricePerDay: room.pricePerDay,
    maintenanceCostPerDay: room.maintenanceCostPerDay,
    discountPercentage: 0,
    promotionId: 'd3c45f12-7890-4567-bcde-89012f34abcd'
  };

  this.reservationService.createReservation(reservation).subscribe({
    next: () => {
  //Actualizacion de la habitacion a ocupada
      const updatedRoom: Room = {
        ...room,
        state: 'ocupada'
      };

      this.roomService.updateRoom(room.id!, updatedRoom).subscribe({
        next: () => {
          alert(`Habitación ${room.roomNumber} reservada con éxito del ${fechas.startDate} al ${fechas.endDate}`);
          this.loadRooms(); // para refrescar habitaciones
        },
        error: (err) => {
          console.error('Error al actualizar estado de habitación:', err);
          alert('La reserva se creó, pero no se pudo actualizar el estado de la habitación.');
        }
      });
    },
    error: (err) => {
      console.error('Error al reservar habitación:', err);
      alert('No se pudo realizar la reserva');
    }
  });
}
}